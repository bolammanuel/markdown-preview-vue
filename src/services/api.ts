import type { MarkdownDocument, ApiResponse } from '../types'

const API_BASE_URL = 'https://api.oluwasetemi.dev'

export const api = {
  async saveDocument(
    document: Omit<MarkdownDocument, 'id'>,
  ): Promise<ApiResponse<MarkdownDocument>> {
    const response = await fetch(`${API_BASE_URL}/markdown`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(document),
    })

    if (!response.ok) {
      throw new Error('Failed to save document')
    }

    return response.json()
  },

  async getDocuments(): Promise<ApiResponse<MarkdownDocument[]>> {
    const response = await fetch(`${API_BASE_URL}/markdown`)
    if (!response.ok) throw new Error('Failed to fetch documents')
    return response.json()
  },

  async getDocument(id: string): Promise<ApiResponse<MarkdownDocument>> {
    const response = await fetch(`${API_BASE_URL}/markdown/${id}`)
    if (!response.ok) throw new Error('Failed to fetch document')
    return response.json()
  },

  async deleteDocument(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_BASE_URL}/markdown/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete document')
    return response.json()
  },
}
