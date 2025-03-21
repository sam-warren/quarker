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

export class PointGrid extends Phaser.GameObjects.Group {
  public pointLocations: { label: string; point: Point }[] = []
  private maxDepth: number = 5 // Maximum recursion depth
  private baseSpacing: number = 1000 // Base spacing between points

  constructor(scene: Phaser.Scene) {
    super(scene)

    const centerX = scene.cameras.main.centerX
    const centerY = scene.cameras.main.centerY

    this.createRecursiveGrid(centerX, centerY, this.baseSpacing, 0)
  }

  createRecursiveGrid(centerX: number, centerY: number, spacing: number, depth: number) {
    // Stop if we've reached max depth
    if (depth >= this.maxDepth) return

    // Create center point
    const centerLabel = `${depth}-0-0`
    this.addPointIfNotExists(new Point(this.scene, centerX, centerY), centerLabel)

    // Create main axis points
    for (let angle = 0; angle < 360; angle += 60) {
      const radian = Phaser.Math.DegToRad(angle)
      const x = centerX + spacing * Math.sin(radian)
      const y = centerY + spacing * Math.cos(radian)
      const label = `${depth}-1-${angle}`
      this.addPointIfNotExists(new Point(this.scene, x, y), label)

      // Recursively create sub-grid at this point
      this.createRecursiveGrid(x, y, spacing / 2, depth + 1)
    }
  }

  addPointIfNotExists(point: Point, label: string) {
    if (!this.pointLocations.find((location) => location.point === point)) {
      this.pointLocations.push({ label, point })
    }
  }

  getPoints() {
    return this.pointLocations
  }
}
