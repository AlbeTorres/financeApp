export type Function<I, O> = I extends void ? () => Promise<O> : (input: I) => Promise<O>
