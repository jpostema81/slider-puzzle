<script setup lang="ts">
import PuzzleBoard from "./components/PuzzleBoard.vue";
import Controls from "./components/Controls.vue";
import store from "./store/index";
</script>

<template>
  <h1>Slider Puzzle</h1>

  <Controls />

  <div class="media">
    <PuzzleBoard />
    <div class="media-body"></div>
  </div>
</template>

<style scoped></style>
