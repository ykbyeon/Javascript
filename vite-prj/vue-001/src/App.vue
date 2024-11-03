<script setup>
  import Home from './views/Home.vue';
  import Sample01 from './views/Sample01.vue';
  import Sample02 from './views/Sample02.vue';
  import About from './views/About.vue';
  import {ref} from "vue"
  import { RouterLink, RouterView } from 'vue-router'

  const countValue = ref(0);

  const increment = () => {
    countValue.value++;
  }

  const decrement = () => {
    countValue.value--;
  }
</script>

<template>

  <RouterLink to="/">Home</RouterLink> &nbsp; 
  <RouterLink to="/sample01">Sample01</RouterLink> &nbsp; 
  <RouterLink to="/sample02">Sample02</RouterLink> &nbsp; 
  <RouterLink to="/about">About</RouterLink>
  <hr />
  <div class="displayArea">
    <RouterView />
  </div>

  <div>
    <button @click="increment">Increment</button> &nbsp; <button @click="decrement">Decrement</button>
  </div>

  <Home :count-value="countValue"  @incrementChild="(v) =>{ increment(); }" @decrementChild="(v) =>{ decrement(); }" />
  <Sample01 :count-value="countValue"  @incrementChild="(v) =>{ increment(); }" @decrementChild="(v) =>{ decrement(); }" />
  <Sample02 :count-value="countValue"  @incrementChild="(v) =>{ increment(); }" @decrementChild="(v) =>{ decrement(); }" />
  <About :count-value="countValue"  @incrementChild="(v) =>{ increment(); }" @decrementChild="(v) =>{ decrement(); }" />
</template>

<style scoped>
  .displayArea {
    margin:20px;
    padding: 20px;
    background-color: lightblue;
    border:2px dotted blueviolet;
  }
</style>
