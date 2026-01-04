<script setup lang="ts">
import { ref } from 'vue'
import { AlertTriangle, RefreshCw } from 'lucide-vue-next'

const shouldError = ref(false)
const reloaded = ref(false)

const triggerError = () => {
  shouldError.value = true
}

const reload = () => {
  reloaded.value = true
  shouldError.value = false
}

const reset = () => {
  shouldError.value = false
  reloaded.value = false
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-white px-4">
    <!-- Error State -->
    <div
      v-if="shouldError && !reloaded"
      class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200"
    >
      <AlertTriangle class="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h1>
      <p class="text-gray-600 mb-6">Don't worry — you can reload and try again.</p>

      <button
        @click="reload"
        class="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold mx-auto"
      >
        <RefreshCw class="w-5 h-5" />
        Reload Page
      </button>
    </div>

    <div v-else-if="reloaded" class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Page Reloaded!</h1>
      <p class="text-gray-600 mb-4">You can test another error below</p>
      <button
        @click="reset"
        class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
      >
        Go Back
      </button>
    </div>

    <div
      v-else
      class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200"
    >
      <AlertTriangle class="w-16 h-16 text-yellow-500 mx-auto mb-4" />
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Error Boundary Test</h1>
      <p class="text-gray-600 mb-6">Click the button below to trigger a simulated error screen.</p>

      <button
        @click="triggerError"
        class="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
      >
        Trigger Error
      </button>
    </div>
  </div>
</template>
