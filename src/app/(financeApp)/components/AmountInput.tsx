import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Info, MinusCircle, PlusCircle } from 'lucide-react'
import React from 'react'

type Props = {
  value: string
  onChange: (value: string | undefined) => void
  placeholder?: string
  disabled?: boolean
}

export const AmountInput = React.forwardRef<HTMLInputElement, Props>(
  ({ value, onChange, placeholder, disabled }, ref) => {
    const parsedValue = parseFloat(value)
    const isIncome = parsedValue > 0
    const isExpense = parsedValue < 0

    const onReverseValue = () => {
      if (!value) return
      console.log(value)
      const newValue = parseFloat(value.replace(',', '.')) * -1
      console.log(newValue)
      onChange(newValue.toFixed(2).toString())
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value

      // Permitir solo números, signo negativo, punto y coma
      const regex = /^-?\d*([.,]\d{0,2})?$/

      if (regex.test(inputValue) || inputValue === '') {
        // Reemplazar coma por punto para consistencia
        const normalizedValue = inputValue.replace(',', '.')

        // Limitar a dos decimales
        const parts = normalizedValue.split('.')
        if (parts[1] && parts[1].length > 2) {
          parts[1] = parts[1].slice(0, 2)
        }

        onChange(parts.join('.'))
      }
    }

    return (
      <div className='relative'>
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <button
                type='button'
                onClick={onReverseValue}
                className={cn(
                  'bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition',
                  { 'bg-emerald-500 hover:bg-emerald-600': isIncome },
                  { 'bg-red-500 hover:bg-red-600': isExpense }
                )}
              >
                {!parsedValue && <Info className='size-3 text-white ' />}
                {isIncome && <PlusCircle className='size-3 text-white ' />}
                {isExpense && <MinusCircle className='size-3 text-white ' />}
              </button>
            </TooltipTrigger>
            <TooltipContent>Use [+] for income and [-] for expenses</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          value={value}
          ref={ref}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder={placeholder}
          prefix='$'
          className='!pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
        />
        <p className='text-xs text-muted-foreground mt-2'>
          {isIncome && 'This will come as income'}
          {isExpense && 'This will come as an expense'}
        </p>
      </div>
    )
  }
)

AmountInput.displayName = 'AmountInput'
