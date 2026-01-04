<script setup lang="ts">
import { computed } from 'vue'
import Editor from '@/components/MarkdownEditor.vue'
import Preview from '@/components/PreviewMarkdown.vue'
import Toolbar from '@/components/ToolBar.vue'
import { useMarkdown } from '@/composables/useMarkdown'
import { useLocalStorage } from '@/composables/useLocalStorage'

const INITIAL_MARKDOWN = `# Welcome to Emmanuel's Markdown Preview!

## What is this?
A **real-time** markdown editor with live preview. Start typing to see the magic!

## Features Demonstrated

### Text Formatting
- **Bold text** with double asterisks
- *Italic text* with single asterisks
- ***Bold and italic*** with triple asterisks
- ~~Strikethrough~~ with double tildes

### Lists
#### Unordered List
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

#### Ordered List
1. First item
2. Second item
3. Third item

### Code Examples
Inline code: \`const x = 10;\`

Code block:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

### Blockquote
> "The only way to do great work is to love what you do."
> — Steve Jobs

---

**Start editing** to see your changes in real-time!
`

const savedMarkdown = useLocalStorage('markdown-content', INITIAL_MARKDOWN)
const { markdown, html, isLoading, setMarkdown } = useMarkdown(savedMarkdown.value)

const hasUnsavedChanges = computed(() => markdown.value !== savedMarkdown.value)

const handleSave = () => {
  savedMarkdown.value = markdown.value

  // Show toast notification
  const toast = document.createElement('div')
  toast.className =
    'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50'
  toast.textContent = '✓ Saved to local storage!'
  document.body.appendChild(toast)
  setTimeout(() => toast.remove(), 2000)
}

const handleClear = () => {
  if (confirm('Are you sure you want to clear all content? This cannot be undone.')) {
    setMarkdown('')
  }
}

const handleDownload = () => {
  try {
    const blob = new Blob([markdown.value], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `markdown-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Download failed:', error)
    alert('Failed to download file')
  }
}

const handleUpload = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.md,.txt,.markdown'

  input.onchange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File is too large. Maximum size is 5MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const content = event.target?.result
      if (typeof content === 'string') {
        setMarkdown(content)
      }
    }

    reader.onerror = () => {
      alert('Failed to read file')
    }

    reader.readAsText(file)
  }

  input.click()
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <Toolbar
      :has-unsaved-changes="hasUnsavedChanges"
      @save="handleSave"
      @clear="handleClear"
      @download="handleDownload"
      @upload="handleUpload"
    />

    <main class="flex-1 flex flex-col lg:flex-row overflow-hidden">
      <section
        class="w-full lg:w-1/2 h-1/2 lg:h-full border-b lg:border-b-0 lg:border-r border-gray-200"
        aria-label="Markdown editor section"
      >
        <Editor v-model="markdown" />
      </section>

      <section
        class="w-full lg:w-1/2 h-1/2 lg:h-full bg-gray-50"
        aria-label="Markdown preview section"
      >
        <Preview :html="html" :is-loading="isLoading" />
      </section>
    </main>
  </div>
</template>
