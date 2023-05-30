import { computed, ref } from "vue";

type Tile = {
  x: number;
  y: number;
};

type State = {
  nbRows: number;
  nbColumns: number;
  selectedImage: string;
};

const state = ref({
  nbRows: 3,
  nbColumns: 3,
  selectedImage: "",
} as State);

const getters = {
  nbRows: computed(() => state.value.nbRows),
  nbColumns: computed(() => state.value.nbColumns),
  selectedImage: computed(() => state.value.selectedImage),
  selectedImageParsed: computed(() => {
    const img = new Image();
    img.src = state.value.selectedImage;
    return img;
  }),
  tiles: computed(() => {
    const tiles: Tile[][] = [];

    const imageWidth = getters.selectedImageParsed.value.width;
    const imageHeight = getters.selectedImageParsed.value.height;
    const tileWidth = imageWidth / state.value.nbColumns;
    const tileHeigth = imageHeight / state.value.nbRows;

    for (let i = 0; i < state.value.nbRows; i++) {
      tiles[i] = [];

      for (let j = 0; j < state.value.nbColumns; j++) {
        tiles[i][j] = { x: i * tileWidth, y: j * tileHeigth };
      }
    }

    return tiles;
  }),
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
  startGame: (): void => {
    // TODO: shuffle the tiles
  },
};

export const store = { getters, actions };
