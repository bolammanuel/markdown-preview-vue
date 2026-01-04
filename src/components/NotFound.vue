<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FileQuestion, Home } from 'lucide-vue-next'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <FileQuestion class="w-24 h-24 mx-auto text-gray-400 mb-4" />
      <h1 class="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p class="text-xl text-gray-600 mb-8">Page not found</p>
      <button
        @click="goHome"
        class="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Home class="w-5 h-5" />
        Go Home
      </button>
    </div>
  </div>
</template>
