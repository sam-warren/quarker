import Phaser from "phaser";

export interface GridConfig {
    scene: Phaser.Scene;
    color?: number;
    lineWidth?: number;
    radius?: number;
}

export class Grid extends Phaser.GameObjects.Graphics {
    public scene: Phaser.Scene;
    private color: number;
    private lineWidth: number;
    private radius: number;

    constructor(config: GridConfig) {
        super(config.scene);
        
        this.scene = config.scene;
        this.color = config.color || 0xffffff;
        this.lineWidth = config.lineWidth || 2;
        this.radius = config.radius || Math.max(this.scene.game.canvas.width, this.scene.game.canvas.height) / 2;
        
        this.drawGrid();
        config.scene.add.existing(this);
    }

    private drawGrid(): void {
        // Clear any previous drawing
        this.clear();

        // Set line style
        this.lineStyle(this.lineWidth, this.color);

        // Get center of screen
        const centerX = this.scene.game.canvas.width / 2;
        const centerY = this.scene.game.canvas.height / 2;

        // Draw 6 spokes at 60-degree intervals
        for (let angle = 0; angle < 360; angle += 60) {
            const radians = Phaser.Math.DegToRad(angle);
            
            // Calculate end point of each spoke
            const endX = centerX + this.radius * Math.cos(radians);
            const endY = centerY + this.radius * Math.sin(radians);

            // Draw the spoke
            this.beginPath();
            this.moveTo(centerX, centerY);
            this.lineTo(endX, endY);
            this.strokePath();
        }
    }

    public setGridColor(color: number): void {
        this.color = color;
        this.drawGrid();
    }

    public setGridRadius(radius: number): void {
        this.radius = radius;
        this.drawGrid();
    }

    public setGridLineWidth(width: number): void {
        this.lineWidth = width;
        this.drawGrid();
    }
}
