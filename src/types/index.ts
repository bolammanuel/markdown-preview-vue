export interface MarkdownDocument {
  id: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}
