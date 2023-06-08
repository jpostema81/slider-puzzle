<script setup lang="ts">
import store from "../store/index.js";

const props = defineProps(["tile"]);
</script>

<template>
  <div :style="props.tile" v-if="store.getters.selectedImage.value" />
</template>

<style scoped></style>
