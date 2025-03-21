import "phaser"
import { Point } from "./points"

export class Tile extends Phaser.GameObjects.Sprite {
  private points: { label: string; point: Point }[]

  constructor(scene: Phaser.Scene, points: { label: string; point: Point }[]) {
    // Initialize with a simple rectangle texture
    super(scene, points[0].point.x, points[0].point.y, "tile")

    this.points = points

    // If the tile texture doesn't exist, create it
    if (!scene.textures.exists("tile")) {
      this.drawLine(points[0], points[1])
    }

    scene.add.existing(this)
  }

  drawLine(point1: { label: string; point: Point }, point2: { label: string; point: Point }) {
    const graphics = this.scene.add.graphics()
    graphics.lineStyle(1, 0xffffff)
    graphics.strokeLineShape(new Phaser.Geom.Line(point1.point.x, point1.point.y, point2.point.x, point2.point.y))
    graphics.destroy()
  }
}
