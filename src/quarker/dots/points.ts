import Phaser from "phaser"

export class Point extends Phaser.GameObjects.Graphics {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    radius: number = 2,
    color: number = 0xffffff
  ) {
    super(scene)

    // Set the fill color
    this.fillStyle(color)

    // Draw the circle
    this.fillCircle(x, y, radius)

    // Add this graphics object to the scene
    scene.add.existing(this)
  }
}

export class PointStar extends Phaser.GameObjects.Group {
  private points: Point[] = []

  constructor(scene: Phaser.Scene) {
    super(scene)

    const centerX = scene.cameras.main.centerX
    const centerY = scene.cameras.main.centerY

    // Create vertical line
    for (let j = -5; j <= 5; j++) {
      this.points.push(new Point(scene, centerX, centerY + j * 100))
    }

    // Create rotated line (60 degrees)
    const angle = Phaser.Math.DegToRad(60)
    for (let j = -5; j <= 5; j++) {
      const rotatedX = centerX + j * 100 * Math.sin(angle)
      const rotatedY = centerY + j * 100 * Math.cos(angle)
      this.points.push(new Point(scene, rotatedX, rotatedY))
    }

    // Create rotated line (120 degrees)
    const angle2 = Phaser.Math.DegToRad(120)
    for (let j = -5; j <= 5; j++) {
      const rotatedX = centerX + j * 100 * Math.sin(angle2)
      const rotatedY = centerY + j * 100 * Math.cos(angle2)
      this.points.push(new Point(scene, rotatedX, rotatedY))
    }
  }
}

export class PointGrid extends Phaser.GameObjects.Group {
  private points: Point[] = []

  constructor(scene: Phaser.Scene) {
    super(scene)

    const centerX = scene.cameras.main.centerX
    const centerY = scene.cameras.main.centerY

    // Create vertical line and for each point, create rotated lines
    for (let j = -5; j <= 5; j++) {
      const verticalY = centerY + j * 100
      // Add the vertical point
      this.points.push(new Point(scene, centerX, verticalY))

      // Create rotated line (60 degrees) for this vertical point
      const angle = Phaser.Math.DegToRad(60)
      for (let k = -5; k <= 5; k++) {
        const rotatedX = centerX + k * 100 * Math.sin(angle)
        const rotatedY = verticalY + k * 100 * Math.cos(angle)
        this.points.push(new Point(scene, rotatedX, rotatedY))
      }

      // Create rotated line (120 degrees) for this vertical point
      const angle2 = Phaser.Math.DegToRad(120)
      for (let k = -5; k <= 5; k++) {
        const rotatedX = centerX + k * 100 * Math.sin(angle2)
        const rotatedY = verticalY + k * 100 * Math.cos(angle2)
        this.points.push(new Point(scene, rotatedX, rotatedY))
      }
    }
  }
}
