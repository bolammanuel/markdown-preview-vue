<script setup lang="ts">
import { ref } from 'vue'

const { modelValue } = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="bg-gray-100 px-4 py-3 border-b border-gray-200">
      <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wide" id="editor-label">
        Markdown Editor
      </h2>
    </div>

    <!-- Textarea -->
    <textarea
      ref="textareaRef"
      :value="modelValue"
      @input="handleInput"
      class="flex-1 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      placeholder="# Start typing your markdown here...

**Bold text**, *italic text*, and more!

- List item 1
- List item 2"
      aria-labelledby="editor-label"
      spellcheck="false"
    />
  </div>
</template>
