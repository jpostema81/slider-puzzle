import { computed, ref } from "vue";

const state = ref({
  nbRows: 3,
  nbColumns: 3,
  selectedImage: "",
});

const getters = {
  nbRows: computed(() => state.value.nbRows),
  nbColumns: computed(() => state.value.nbColumns),
  selectedImage: computed(() => state.value.selectedImage),
};

const actions = {
  setNbRows: (nbRows: number): void => {
    state.value.nbRows = nbRows;
  },
  setNbColumns: (nbColumns: number): void => {
    state.value.nbColumns = nbColumns;
  },
  setSelectedImage: (selectedImage: string): void => {
    state.value.selectedImage = selectedImage;
  },
};

export const store = { getters, actions };
