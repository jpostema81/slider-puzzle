import { computed, reactive } from "vue";

type State = {
  nbRows: number;
  nbColumns: number;
  selectedImage: string;
  selectedImageDimensions: object;
  shuffledIndexes: number[];
  openTileIndex: number;
};

const store = {
  state: reactive({
    nbRows: 3,
    nbColumns: 3,
    selectedImage: "",
    selectedImageDimensions: { width: 0, height: 0 },
    shuffledIndexes: [],
    openTileIndex: 0,
  } as State),

  getters: {
    nbRows: computed(() => store.state.nbRows),
    nbColumns: computed(() => store.state.nbColumns),
    nbCells: computed(() => store.state.nbRows * store.state.nbColumns),
    selectedImage: computed(() => store.state.selectedImage),
    selectedImageDimensions: computed(() => {
      return store.state.selectedImageDimensions;
    }),
    tileDimensions: computed(() => {
      if (
        store.state.selectedImageDimensions.width >
        store.state.selectedImageDimensions.height
      ) {
        return {
          width: Math.round(600 / store.state.nbColumns),
          height: Math.round(
            ((600 / store.state.selectedImageDimensions.width) *
              store.state.selectedImageDimensions.height) /
              store.state.nbRows
          ),
        };
      } else {
        return {
          width: Math.round(
            ((600 / store.state.selectedImageDimensions.height) *
              store.state.selectedImageDimensions.width) /
              store.state.nbColumns
          ),
          height: Math.round(600 / store.state.nbRows),
        };
      }
    }),
    tiles: computed(() => {
      let tiles = [
        {
          width: store.getters.tileDimensions.value.width + "px",
          height: store.getters.tileDimensions.value.height + "px",
          "background-color": "white",
          border: "1px solid black",
          id: "openTile",
          order: store.state.shuffledIndexes[0],
        },
      ];

      for (let i = 1; i < store.getters.nbCells.value; i++) {
        const rowNb = Math.floor(i / store.state.nbColumns);
        const colNb = i - rowNb * store.state.nbColumns;
        const offsetX = -1 * colNb * store.getters.tileDimensions.value.width;
        const offsetY = -1 * rowNb * store.getters.tileDimensions.value.height;

        tiles.push({
          width: store.getters.tileDimensions.value.width + "px",
          height: store.getters.tileDimensions.value.height + "px",
          background: "url('" + store.state.selectedImage + "')",
          "background-position": offsetX + "px " + offsetY + "px",
          order: store.state.shuffledIndexes[i],
        });
      }

      return tiles;
    }),
  },

  actions: {
    setNbRows: (nbRows: number): void => {
      store.state.nbRows = nbRows;
    },
    setNbColumns: (nbColumns: number): void => {
      store.state.nbColumns = nbColumns;
    },
    setSelectedImage: (selectedImage: ImageBitmap): void => {
      let width, height;

      if (selectedImage.width > selectedImage.height) {
        width = 600;
        height = Math.round((600 / selectedImage.width) * selectedImage.height);
      } else {
        height = 600;
        width = Math.round((600 / selectedImage.height) * selectedImage.width);
      }

      store.state.selectedImageDimensions.width = width;
      store.state.selectedImageDimensions.height = height;

      // create an off-screen canvas
      var canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");

      // set its dimension to target size
      canvas.width = width;
      canvas.height = height;

      // draw source image into the off-screen canvas:
      ctx.drawImage(selectedImage, 0, 0, width, height);

      // encode image to data-uri with base64 version of compressed image

      store.state.selectedImage = canvas.toDataURL();
    },
    startGame: (): void => {
      store.actions.shuffleTiles();
    },
    moveTile: (index: number): void => {
      const temp = store.state.shuffledIndexes[store.state.openTileIndex];

      store.state.shuffledIndexes[store.state.openTileIndex] =
        store.state.shuffledIndexes[index];
      store.state.shuffledIndexes[index] = temp;
    },

    shuffleTiles: () => {
      const range = [...Array(store.getters.nbCells.value).keys()];
      store.state.shuffledIndexes = range;
      console.log(range);
    },
  },
};

export default store;
