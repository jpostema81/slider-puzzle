<script setup lang="ts">
import PuzzleBoard from "./components/PuzzleBoard.vue";
import Controls from "./components/Controls.vue";
import { store } from "./store";
// import { ref } from "vue";

const startGame = () => {};
</script>

<template>
  <h1>Slider Puzzle</h1>

  <Controls />

  <div class="media">
    <PuzzleBoard />
    <div class="media-body">
      <button
        v-if="store.getters.selectedImage.value"
        @click="startGame"
        type="button"
        class="btn btn-success"
      >
        Start
      </button>
    </div>
  </div>
</template>

<style scoped>
#selectedImage {
  margin: 50px;
  width: 400px;
}
</style>
