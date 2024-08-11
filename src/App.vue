<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <main class="h-full w-full max-w-7xl mx-auto flex">
    <section class="w-full">
      <router-view />
    </section>
  </main>
</template>

<style scoped></style>
