export function parseResponse(
  state: boolean,
  error_code: 401 | 500 | 403 | 404 | 200 | 400,
  error: any | null,
  message: string | null,
  data?: any
) {
  return {
    state,
    error,
    error_code,
    message,
    data,
  }
}
