// src/composables/useDebounce.ts
import { ref, watch } from 'vue'

/**
 * Debounces a reactive value.
 * @param value - The value to debounce
 * @param delay - Debounce delay in milliseconds (default 300ms)
 * @returns A reactive debounced ref
 */
export function useDebounce<T>(value: T, delay = 300) {
  const debounced = ref(value) as { value: T }
  let timer: number | undefined

  watch(
    () => value,
    (newValue) => {
      if (timer) clearTimeout(timer)
      timer = window.setTimeout(() => {
        debounced.value = newValue
      }, delay)
    },
  )

  return debounced
}
