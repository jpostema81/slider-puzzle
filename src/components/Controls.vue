<script setup lang="ts">
import store from "./../store";
import { GameState } from "../types";
import { maxNbColumns, maxNbRows } from "./consts";

const updateNbRows = ({ target }: Event): void => {
  store.actions.setNbRows(+(target as HTMLInputElement).value);
};

const updateNbColumns = ({ target }: Event): void => {
  store.actions.setNbColumns(+(target as HTMLInputElement).value);
};

function readFile({ target }: Event): void {
  if (
    (target as HTMLInputElement).files &&
    (target as HTMLInputElement).files?.length
  ) {
    var reader = new FileReader();

    reader.onload = (file): void => {
      const image = new Image();

      if (file.target) {
        image.src = file.target.result as string;
        image.onload = () => {
          store.actions.setSelectedImage(image);
        };
      }
    };

    reader.readAsDataURL(target.files[0]);
  }
}
</script>

<template>
  Select an image:
  <input type="file" @change="readFile" />

  Board size
  <input
    type="number"
    min="2"
    max="maxNbRows"
    :value="store.getters.nbRows.value"
    @change="updateNbRows"
    class="smallInput"
  />
  x
  <input
    type="number"
    min="2"
    max="maxNbColumns"
    :value="store.getters.nbColumns.value"
    @change="updateNbColumns"
    class="smallInput"
  />

  <button
    v-if="store.state.gameState === GameState.Stopped"
    @click="store.actions.startGame"
    type="button"
    class="btn btn-success m-1"
  >
    Start
  </button>

  <button
    v-if="store.getters.gameState.value !== GameState.Stopped"
    @click="store.actions.toggleOriginalImage"
    type="button"
    class="btn btn-info m-1"
  >
    Toggle original image
  </button>

  <button
    v-if="store.getters.gameState.value !== GameState.Stopped"
    @click="resetImage"
    type="button"
    class="btn btn-danger m-1"
  >
    Reset
  </button>

  <button
    v-if="store.getters.gameState.value !== GameState.Stopped"
    @click="store.actions.newGame"
    type="button"
    class="btn btn-warning m-1"
  >
    New game
  </button>
</template>

<style scoped>
.smallInput {
  width: 50px;
}
</style>
