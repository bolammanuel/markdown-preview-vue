import { ref, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

export function useMarkdown(initialValue: string = '') {
  const markdown = ref(initialValue)
  const html = ref('')
  const isLoading = ref(false)

  const parseMarkdown = (text: string) => {
    isLoading.value = true
    try {
      const rawHtml = marked(text) as string
      html.value = DOMPurify.sanitize(rawHtml)
    } catch (error) {
      console.error('Markdown parsing error:', error)
      html.value = '<p>Error parsing markdown</p>'
    } finally {
      isLoading.value = false
    }
  }

  // Watch for changes and parse automatically
  watch(
    markdown,
    (newValue) => {
      parseMarkdown(newValue)
    },
    { immediate: true },
  )

  const setMarkdown = (value: string) => {
    markdown.value = value
  }

  return {
    markdown,
    html,
    isLoading,
    setMarkdown,
  }
}
