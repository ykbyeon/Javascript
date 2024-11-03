
<script setup>
    import { useCounterStore } from "../stores/storeCounter";
    const countStore = useCounterStore();

    defineProps({
        countValue: Number,
    });

    const emits = defineEmits([
        'incrementChild', 
        'decrementChild',
    ]);

    const increment = () => {
        emits('incrementChild','');
    };

    const decrement = () => {
        emits('decrementChild','');
    };
</script>

<template>
    <h1>About</h1>
    <hr />
    <div>
        <button @click="increment">UP</button> &nbsp; 
            COUNT :: {{countValue}} &nbsp;
        <button @click="decrement">Down</button> &nbsp; 
    </div>
    <div>
        <button @click="countStore.incrementStore">Store Increment</button>
            STORE COUNT :: {{countStore.storeCounter}} &nbsp; 
        <button @click="countStore.decrementStore">Store Decrement</button>
    </div>
</template>

<style scoped>
</style>
