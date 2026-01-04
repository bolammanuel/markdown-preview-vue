<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  html: string
  isLoading?: boolean
}>()

const previewRef = ref<HTMLDivElement | null>(null)

watch(
  () => props.html,
  () => {
    if (previewRef.value) {
      const isScrolledToBottom =
        previewRef.value.scrollHeight - previewRef.value.clientHeight <=
        previewRef.value.scrollTop + 100

      if (isScrolledToBottom) {
        previewRef.value.scrollTop = previewRef.value.scrollHeight
      }
    }
  },
)
</script>

<template>
  <div class="h-full flex flex-col bg-white">
    <!-- Header -->
    <div class="bg-gray-100 px-4 py-3 border-b border-gray-200">
      <h2 class="font-semibold text-gray-800 text-sm uppercase tracking-wide" id="preview-label">
        Preview
        <span v-if="isLoading" class="ml-2 text-xs text-blue-600 animate-pulse">
          Rendering...
        </span>
      </h2>
    </div>

    <!-- Preview Content -->
    <div
      ref="previewRef"
      class="flex-1 p-6 overflow-auto"
      role="region"
      aria-labelledby="preview-label"
    >
      <article
        v-if="html"
        class="prose prose-sm md:prose-base lg:prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
        v-html="html"
      />
      <div v-else class="text-gray-400 italic">Your preview will appear here...</div>
    </div>
  </div>
</template>
