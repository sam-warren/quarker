import { Tile } from "./tile";

export class Plane {
  private tileSize: number = 50; // Default tile size
  private tileHeight: number; // Height of the rhombus (calculated from size)
  private tileWidth: number; // Width of the rhombus
  private halfTileWidth: number;

  constructor(private scene: Phaser.Scene, private tiles: Tile[]) {
    // For perfect tiling with 45-degree rotation:
    // The effective width/height after rotation is sqrt(2) * size
    this.tileWidth = this.tileSize * Math.sqrt(2);
    this.tileHeight = this.tileWidth;
    this.halfTileWidth = this.tileWidth / 2;
  }

  /**
   * Creates a rhombus tiling pattern in all directions
   * @param centerX The x-coordinate of the center tile
   * @param centerY The y-coordinate of the center tile
   * @param radius The number of tiles to extend in each direction
   * @param color The color of the tiles (hex value)
   */
  createTiling(centerX: number, centerY: number, radius: number, color: number = 0xffffff) {
    // Clear existing tiles
    this.tiles.forEach(tile => tile.destroy());
    this.tiles = [];

    // Create horizontal line
    for (let x = -radius; x <= radius; x++) {
      this.createTileAt(centerX + x * this.halfTileWidth, centerY, color);
    }

    // Create diagonal lines going up-right and up-left
    for (let i = 1; i <= radius; i++) {
      // Up-right diagonal
      for (let j = -radius; j <= radius; j++) {
        const x = centerX + (j * this.halfTileWidth);
        const y = centerY - i * this.halfTileWidth;
        this.createTileAt(x, y, color);
      }

      // Up-left diagonal
      for (let j = -radius; j <= radius; j++) {
        const x = centerX + (j * this.halfTileWidth);
        const y = centerY - i * this.halfTileWidth;
        this.createTileAt(x, y, color);
      }

      // Down-right diagonal
      for (let j = -radius; j <= radius; j++) {
        const x = centerX + (j * this.halfTileWidth);
        const y = centerY + i * this.halfTileWidth;
        this.createTileAt(x, y, color);
      }

      // Down-left diagonal
      for (let j = -radius; j <= radius; j++) {
        const x = centerX + (j * this.halfTileWidth);
        const y = centerY + i * this.halfTileWidth;
        this.createTileAt(x, y, color);
      }
    }
  }

  /**
   * Creates a single tile at the specified position
   */
  private createTileAt(x: number, y: number, color: number) {
    const tile = new Tile(this.scene, {
      position: new Phaser.Math.Vector2(x, y),
      color: color,
      size: this.tileSize,
      rotation: Math.PI / 4 // 45 degrees rotation to align with pattern
    });
    this.tiles.push(tile);
  }

  /**
   * Gets all tiles in the plane
   */
  getTiles(): Tile[] {
    return this.tiles;
  }

  /**
   * Sets the color of all tiles
   */
  setColor(color: number): void {
    this.tiles.forEach(tile => tile.setTileColor(color));
  }
}

