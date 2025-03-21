import Phaser from "phaser"
import { PointGrid } from "./dots/points"
export default class DemoQuarker extends Phaser.Scene {
  planckConfig = {
    scaleFactor: 30,
    gravity: { x: 0, y: 9 },
    debug: true,
    speed: 1,
    hz: 60,
  }
  constructor() {
    super({ key: "DemoQuarker" })
  }

  preload() {}

  init() {}

  create() {
      // const pointStar = new PointStar(this)
      // this.add.existing(pointStar)

    const pointGrid = new PointGrid(this)
    this.add.existing(pointGrid)

    const points = pointGrid.getPoints()
    console.log(points)


    // const rhombus = new Rhombus(this, points, points[0], 10)
    // this.add.existing(rhombus)

    // Center the camera at (0,0)
    // this.cameras.main.setPosition(0, 0);
    // this.cameras.main.centerOn(0, 0);

    // const tile = new Tile(this, {
    //   position: new Phaser.Math.Vector2(0, 0),
    //   color: 0xffffff,
    // })

    // this.add.existing(tile)

    // const plane = new Plane(this, [tile])
    // plane.createTiling(0, 0, 10, 0xffffff)

    // const grid = new Grid({
    //   scene: this,
    //   color: 0xffffff,
    //   lineWidth: 0.5,
    //   radius: 250,
    // })

    // this.add.existing(grid)
  }
}
