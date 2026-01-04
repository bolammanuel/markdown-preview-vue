<script setup lang="ts">
import { Save, Download, Upload, Trash2, FileText } from 'lucide-vue-next'

const { hasUnsavedChanges } = defineProps<{
  hasUnsavedChanges?: boolean
}>()

const emit = defineEmits<{
  save: []
  clear: []
  download: []
  upload: []
}>()
</script>

<template>
  <header class="bg-white border-b border-gray-200 px-4 py-3 shadow-sm" role="banner">
    <div class="max-w-7xl mx-auto flex items-center gap-3">
      <!-- Logo/Title -->
      <div class="flex items-center gap-2 mr-auto">
        <FileText class="w-6 h-6 text-blue-600" />
        <h1 class="text-xl font-bold text-gray-900">Markdown Preview</h1>
        <span
          v-if="hasUnsavedChanges"
          class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
        >
          Unsaved
        </span>
      </div>

      <!-- Action Buttons -->
      <nav class="flex items-center gap-2" role="navigation">
        <button
          @click="emit('upload')"
          class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          title="Import .md file"
        >
          <Upload class="w-4 h-4" />
          <span class="hidden sm:inline">Import</span>
        </button>

        <button
          @click="emit('download')"
          class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          title="Download as .md file"
        >
          <Download class="w-4 h-4" />
          <span class="hidden sm:inline">Export</span>
        </button>

        <button
          @click="emit('save')"
          class="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded transition-colors"
          title="Save to local storage"
        >
          <Save class="w-4 h-4" />
          <span class="hidden sm:inline">Save</span>
        </button>

        <button
          @click="emit('clear')"
          class="flex items-center gap-2 px-3 py-2 border border-gray-300 hover:bg-gray-100 rounded transition-colors"
          title="Clear all content"
        >
          <Trash2 class="w-4 h-4" />
          <span class="hidden sm:inline">Clear</span>
        </button>
      </nav>
    </div>
  </header>
</template>
