import Phaser from "phaser"
import { Point } from "./points"

export class Line extends Phaser.GameObjects.Graphics {
  constructor(
    scene: Phaser.Scene,
    startPoint: Point,
    endPoint: Point,
    color: number = 0xffffff,
    width: number = 2
  ) {
    super(scene)

    // Set the line style (color and width)
    this.lineStyle(width, color)

    // Draw the line from start point to end point
    this.beginPath()
    this.moveTo(startPoint.x, startPoint.y)
    this.lineTo(endPoint.x, endPoint.y)
    this.strokePath()

    // Add this graphics object to the scene
    scene.add.existing(this)
  }
}
