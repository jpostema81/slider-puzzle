<script setup lang="ts">
import store from "./../store";
import Tile from "../components/Tile.vue";
import { computed } from "vue";
import { GameState } from "../types";

const classObject = computed(() => ({
  display: "grid",
  border: "5px solid black",
  margin: "0 auto",
  "background-image": "url(" + store.getters.selectedImage.value + ")",
  width: store.getters.selectedImageDimensions.value.width + "px",
  height: store.getters.selectedImageDimensions.value.height + "px",
  "grid-template-columns":
    "repeat(" + store.getters.nbColumns.value + ", auto)",
}));
</script>

<template>
  <div v-if="store.getters.selectedImage.value" :style="classObject">
    <Tile
      v-if="store.getters.gameState.value === GameState.Started"
      v-for="(item, index) in store.getters.tiles.value"
      :index="index"
      :tile="item"
    />
  </div>
</template>

<style scoped></style>
