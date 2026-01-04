import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
  sanitize: false,
})

export const parseMarkdown = (markdown) => {
  if (!markdown || typeof markdown !== 'string') {
    return ''
  }

  try {
    const rawHTML = marked.parse(markdown)

    const cleanHTML = DOMPurify.sanitize(rawHTML, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'strong',
        'em',
        'u',
        's',
        'del',
        'a',
        'img',
        'code',
        'pre',
        'ul',
        'ol',
        'li',
        'blockquote',
        'hr',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    })

    return cleanHTML
  } catch (error) {
    console.error('Markdown parsing error:', error)
    return '<p class="text-red-600">Error parsing markdown</p>'
  }
}
