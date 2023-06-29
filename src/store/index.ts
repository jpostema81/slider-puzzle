import { computed, reactive } from "vue";
import { State, GameState } from "../types";

const defaultState: State = {
  nbRows: 3,
  nbColumns: 3,
  selectedImage: "",
  selectedImageDimensions: { width: 0, height: 0 },
  shuffledIndexes: [],
  gameState: GameState.Stopped,
};

const store = {
  state: reactive({}),
  getters: {
    gameState: computed(() => store.state.gameState),
    nbRows: computed(() => store.state.nbRows),
    nbColumns: computed(() => store.state.nbColumns),
    nbCells: computed(() => store.state.nbRows * store.state.nbColumns),
    selectedImage: computed(() => store.state.selectedImage),
    selectedImageDimensions: computed(() => {
      return store.state.selectedImageDimensions;
    }),
    won: computed(() => {
      return (
        JSON.stringify(store.state.shuffledIndexes) ===
          JSON.stringify([...Array(store.getters.nbCells.value).keys()]) &&
        store.state.gameState === GameState.Started
      );
    }),
    tileDimensions: computed(() => {
      const aspectRatio =
        store.state.selectedImageDimensions.width /
        store.state.selectedImageDimensions.height;
      if (aspectRatio > 1) {
        return {
          width: Math.round(600 / store.state.nbColumns),
          height: Math.round(600 / aspectRatio / store.state.nbRows),
        };
      } else {
        return {
          width: Math.round((600 / store.state.nbColumns) * aspectRatio),
          height: Math.round(600 / store.state.nbRows),
        };
      }
    }),
    tiles: computed(() => {
      let tiles = [];

      for (let i = 0; i < store.getters.nbCells.value - 1; i++) {
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

      tiles.push({
        width: store.getters.tileDimensions.value.width + "px",
        height: store.getters.tileDimensions.value.height + "px",
        "background-color": "white",
        border: "1px solid black",
        order: store.state.shuffledIndexes[store.getters.nbCells.value - 1],
      });

      return tiles;
    }),
  },

  actions: {
    toggleOriginalImage: (): void => {
      if (store.state.gameState === GameState.Started) {
        store.state.gameState = GameState.Paused;
      } else {
        store.state.gameState = GameState.Started;
      }
    },
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
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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
      store.state.gameState = GameState.Started;
    },
    newGame: (): void => {
      store.actions.initializeState();
    },
    resetGame: (): void => {
      store.actions.shuffleTiles();
    },
    initializeState: (): void => {
      store.state = reactive(Object.assign(store.state, defaultState));
    },
    moveTile: (index: number): void => {
      const openTileOrderNb =
        store.state.shuffledIndexes[store.getters.nbCells.value - 1];

      if (
        (store.actions.sameRow(index, openTileOrderNb) &&
          Math.abs(index - openTileOrderNb) === 1) ||
        (store.actions.sameColumn(index, openTileOrderNb) &&
          Math.abs(index - openTileOrderNb) === store.state.nbColumns)
      ) {
        const clickedTileIndex = store.state.shuffledIndexes.findIndex(
          (item: number) => item === index
        );

        store.state.shuffledIndexes[store.getters.nbCells.value - 1] =
          store.state.shuffledIndexes[clickedTileIndex];
        store.state.shuffledIndexes[clickedTileIndex] = openTileOrderNb;
      }
    },
    getAscendingIndexes: (index: number) => {
      let ascendingIndexes = [];

      if (index - 1 >= 0 && store.actions.sameRow(index, index - 1)) {
        ascendingIndexes.push(index - 1);
      }
      if (
        index + 1 < store.getters.nbCells.value &&
        store.actions.sameRow(index, index + 1)
      ) {
        ascendingIndexes.push(index + 1);
      }
      if (
        index - store.getters.nbColumns.value >= 0 &&
        store.actions.sameColumn(index, index - store.getters.nbColumns.value)
      ) {
        ascendingIndexes.push(index - store.getters.nbColumns.value);
      }
      if (
        index + store.getters.nbColumns.value < store.getters.nbCells.value &&
        store.actions.sameColumn(index, index + store.getters.nbColumns.value)
      ) {
        ascendingIndexes.push(index + store.getters.nbColumns.value);
      }

      return ascendingIndexes;
    },
    sameRow: (firstIndex: number, secondIndex: number) => {
      return (
        Math.floor(firstIndex / store.state.nbColumns) ===
        Math.floor(secondIndex / store.state.nbColumns)
      );
    },
    sameColumn: (firstIndex: number, secondIndex: number) => {
      return (
        Math.floor(firstIndex % store.state.nbColumns) ===
        Math.floor(secondIndex % store.state.nbColumns)
      );
    },
    shuffleTiles: async () => {
      store.state.shuffledIndexes = [
        ...Array(store.getters.nbCells.value).keys(),
      ];

      let randomAscendingIndex = 0;
      let previousOpenTileIndex = 0;

      for (let i = 0; i < store.getters.nbCells.value * 4; i++) {
        const openTileOrderNb =
          store.state.shuffledIndexes[store.state.shuffledIndexes.length - 1];
        const ascendingIndexes =
          store.actions.getAscendingIndexes(openTileOrderNb);

        do {
          randomAscendingIndex =
            ascendingIndexes[
              Math.floor(Math.random() * ascendingIndexes.length)
            ];
        } while (previousOpenTileIndex === randomAscendingIndex);

        previousOpenTileIndex = openTileOrderNb;
        store.actions.moveTile(randomAscendingIndex);
      }
    },
  },
};

export default store;
