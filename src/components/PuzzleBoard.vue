<script setup lang="ts">
import { store } from "./../store";
// import { ref } from "vue";
</script>

<template>
  <img
    v-if="store.getters.selectedImage.value"
    id="selectedImage"
    :src="store.getters.selectedImage.value"
    class="mx-auto"
  />
</template>

<style scoped>
#selectedImage {
  margin: 50px;
  width: 400px;
}
</style>
