import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const storedValue = ref<T>(defaultValue)

  try {
    const item = window.localStorage.getItem(key)
    if (item) {
      storedValue.value = JSON.parse(item)
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error)
  }

  watch(
    storedValue,
    (newValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    },
    { deep: true },
  )

  return storedValue
}
