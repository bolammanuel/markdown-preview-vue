<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import type { MarkdownDocument } from '@/types'
import { Trash2, FileText } from 'lucide-vue-next'

const documents = ref<MarkdownDocument[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadDocuments = async () => {
  try {
    loading.value = true
    const response = await api.getDocuments()
    documents.value = response.data
    error.value = null
  } catch (err) {
    error.value = 'Failed to load documents'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this document?')) {
    return
  }

  try {
    await api.deleteDocument(id)
    documents.value = documents.value.filter((doc) => doc.id !== id)
  } catch (err) {
    alert('Failed to delete document')
    console.error(err)
  }
}

onMounted(() => {
  loadDocuments()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Saved Documents</h1>

    <div v-if="loading" class="flex items-center justify-center min-h-[50vh]">
      <div class="text-lg">Loading documents...</div>
    </div>

    <div v-else-if="error" class="flex items-center justify-center min-h-[50vh]">
      <div class="text-red-600">{{ error }}</div>
    </div>

    <div
      v-else-if="documents.length === 0"
      class="flex flex-col items-center justify-center min-h-[50vh]"
    >
      <FileText class="h-16 w-16 text-gray-400 mb-4" />
      <h2 class="text-2xl font-bold mb-2">No saved documents</h2>
      <p class="text-gray-600">Start creating and saving documents to see them here.</p>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="border rounded-lg p-4 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between mb-2">
          <h3 class="text-xl font-semibold truncate flex-1">
            {{ doc.title }}
          </h3>
          <button @click="handleDelete(doc.id)" class="p-2 hover:bg-gray-100 rounded">
            <Trash2 class="h-4 w-4 text-red-500" />
          </button>
        </div>

        <p v-if="doc.createdAt" class="text-sm text-gray-500 mb-2">
          Created: {{ new Date(doc.createdAt).toLocaleDateString() }}
        </p>

        <button
          class="flex items-center gap-2 px-3 py-1 border border-gray-300 hover:bg-gray-100 rounded text-sm"
        >
          <FileText class="h-4 w-4" />
          View
        </button>
      </div>
    </div>
  </div>
</template>
