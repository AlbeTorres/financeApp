import bcryptjs from 'bcryptjs'
import { NextAuthConfig, User } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import prisma from './lib/prisma'
import { getTwofactorConfirmationByUserId } from './lib/two-factor-confirmation'
import { signInSchema } from './lib/zod'

const protectedRoutes = ['/testProtected']
const protectedAdminRoutes = ['/admin']

type SessionUser = AdapterUser & {
  id: string
  name: string
  email: string
  emailVerified: boolean
  role: string
  image: string
} & User
export default {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await prisma.user.findUnique({ where: { id: user.id } })

      //Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false

      if (existingUser.isTwofactorEnabled) {
        const twoFactorConfirmation = await getTwofactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false

        //Delete two factor confirmation for next sign in
        await prisma.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        })
      }

      return true
    },

    authorized({ request: { nextUrl }, auth }) {
      const isLoggedIn = auth?.user
      const isAdmin = auth?.user.role === 'admin'
      const isOnProtected = protectedRoutes.some(route => nextUrl.pathname.startsWith(route))
      const isOnAdminProtected = protectedAdminRoutes.some(route =>
        nextUrl.pathname.startsWith(route)
      )

      if (isOnProtected) {
        if (isOnAdminProtected) {
          if (isLoggedIn) {
            if (isAdmin) {
              return true
            } else {
              Response.redirect(process.env.NEXT_PUBLIC_WEBSITE ?? '')
            }
          }
          return false
        }

        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },
    session({ session, token }) {
      session.user = token.data as SessionUser
      return session
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = await signInSchema.parseAsync(credentials)

        // //   buscar correo
        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } })

        if (!user || !user.password) return null

        // // comparar contraseñas

        if (!bcryptjs.compareSync(password, user.password!)) return null

        // //regresar el usuario

        const { password: _, ...rest } = user

        return rest
      },
    }),
  ],
} satisfies NextAuthConfig
