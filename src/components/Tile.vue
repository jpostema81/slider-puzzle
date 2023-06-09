<script setup lang="ts">
import store from "../store";

const props = defineProps(["tile", "index"]);

const moveTile = () => {
  console.log(props.index);
  console.log("tile clicked");
  store.actions.moveTile(props.index);
};
</script>

<template>
  <div class="tile" :style="props.tile" @click="moveTile" />
</template>

<style scoped>
.tile:hover {
  border: 1px solid red;
}

.tile:not(:hover) {
  border: 1px solid black;
}
</style>
