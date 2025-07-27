<script setup>
import TestPaper from './view/exam/TestPaper.vue';
window.myexamdata = {};
</script>

<template>
  <div><TestPaper style="width: 100%" /></div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
