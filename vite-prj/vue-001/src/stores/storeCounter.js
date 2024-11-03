import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const storeCounter = ref(1000);
  const doubleCount = computed(() => storeCounter.value * 2);
  const halfCount = computed(() => storeCounter.value /2 );
  
  const incrementStore = () => {
    storeCounter.value++
  }

  const decrementStore = () => {
    storeCounter.value--;
  }

  return { storeCounter, doubleCount, halfCount, incrementStore, decrementStore }
})
