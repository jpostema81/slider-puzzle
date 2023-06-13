<script setup lang="ts">
import store from "../store";

const props = defineProps(["tile"]);

const moveTile = () => {
  store.actions.moveTile(props.tile.order);
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
