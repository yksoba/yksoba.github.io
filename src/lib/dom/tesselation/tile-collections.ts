class RowTile extends TileBase {
  _tiles: TileProxy[];
  get tiles() {
    return this._tiles;
  }

  private _callback = () => this.pack();

  constructor(tiles: readonly Tile[]) {
    super();
    this._tiles = tiles
      .flatMap((tile) => (tile instanceof RowTile ? tile.tiles : [tile]))
      .map((tile) => makeTileProxy(tile));
    this._tiles.forEach((tile) => tile.watch(this._callback));
  }

  removeAt(index: number) {
    const [removedTile] = this._tiles.splice(index, 1);
    removedTile.unwatch(this._callback);
  }

  pack() {}
}
