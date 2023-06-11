export enum GameState {
  Stopped = 0,
  Started = 1,
  Paused = 2,
}

export type State = {
  nbRows: number;
  nbColumns: number;
  selectedImage: string;
  selectedImageDimensions: object;
  shuffledIndexes: number[];
  openTileIndex: number;
  gameState: GameState | string;
};
