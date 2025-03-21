import Phaser from "phaser"
import { Point, PointGrid } from "./points"
import { Tile } from "./tile"
export default class DemoQuarker extends Phaser.Scene {
  planckConfig = {
    scaleFactor: 30,
    gravity: { x: 0, y: 9 },
    debug: true,
    speed: 1,
    hz: 60,
  }

  points: { label: string; point: Point }[] = []

  constructor() {
    super({ key: "DemoQuarker" })
  }

  preload() {
    const pointGrid = new PointGrid(this)
    this.add.existing(pointGrid)

    const points = pointGrid.getPoints()
    this.points = points
  }

  init() {}

  create() {
    const tilePoints = [
      { label: "0-0-0", point: this.getPointByLabel("0-0-0")! },
      { label: "0-1-0", point: this.getPointByLabel("0-1-0")! },
    ]

    const tile = new Tile(this, tilePoints)
    this.add.existing(tile)
  }

  getPointByLabel(label: string) {
    return this.points.find((location) => location.label === label)?.point
  }
}
