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

    reader.onload = ({ target }: Event) => {
      store.actions.setSelectedImage(target.result);
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
  />
  x
  <input
    type="number"
    min="2"
    max="5"
    :value="store.getters.nbColumns.value"
    @change="updateNbColumns"
  />
</template>

<style scoped></style>
