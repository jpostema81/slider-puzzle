<script setup lang="ts">
import { store } from "./../store";

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

    reader.onload = ({ target }: Event): void => {
      if ((target as FileReader).result) {
        store.actions.setSelectedImage((target as FileReader).result as string);
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
    max="5"
    :value="store.getters.nbRows.value"
    @change="updateNbRows"
    class="smallInput"
  />
  x
  <input
    type="number"
    min="2"
    max="5"
    :value="store.getters.nbColumns.value"
    @change="updateNbColumns"
    class="smallInput"
  />

  <button
    v-if="store.getters.selectedImage.value"
    @click="store.actions.startGame"
    type="button"
    class="btn btn-success m-1"
  >
    Start
  </button>

  <button
    v-if="store.getters.selectedImage.value"
    @click="toggleOriginalImage"
    type="button"
    class="btn btn-info m-1"
  >
    Toggle original image
  </button>

  <button
    v-if="store.getters.selectedImage.value"
    @click="resetImage"
    type="button"
    class="btn btn-danger m-1"
  >
    Reset
  </button>

  <button
    v-if="store.getters.selectedImage.value"
    @click="newGame"
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
