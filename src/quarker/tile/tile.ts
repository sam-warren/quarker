import Phaser from 'phaser';

export interface TileConfig {
    position: Phaser.Math.Vector2;
    rotation?: number;
    color: number;
    size?: number;
}

export class Tile extends Phaser.GameObjects.Graphics {
    private position: Phaser.Math.Vector2;
    private size: number;
    private tileColor: number;

    constructor(scene: Phaser.Scene, config: TileConfig) {
        super(scene);
        
        this.position = config.position;
        this.rotation = config.rotation || 0;
        this.tileColor = config.color;
        this.size = config.size || 50; // Default size if not specified
        
        this.x = this.position.x;
        this.y = this.position.y;
        
        this.drawRhombus();
        scene.add.existing(this);
    }

    private drawRhombus(): void {
        // Clear any previous drawing
        this.clear();

        // Begin drawing with the specified color
        this.lineStyle(2, this.tileColor);
        this.beginPath();

        // Calculate points for rhombus with 60° and 120° angles
        const halfSize = this.size / 2;
        const height = this.size * Math.sin(Math.PI / 3); // 60 degrees in radians

        // Draw rhombus path
        this.moveTo(0, -height/2);           // Top point
        this.lineTo(halfSize, 0);            // Right point
        this.lineTo(0, height/2);            // Bottom point
        this.lineTo(-halfSize, 0);           // Left point
        this.lineTo(0, -height/2);           // Back to top

        this.closePath();
        this.strokePath();
    }

    public setTileColor(color: number): void {
        this.tileColor = color;
        this.drawRhombus();
    }

    public setTilePosition(x: number, y: number): void {
        this.position.set(x, y);
        this.x = x;
        this.y = y;
    }

    public setTileRotation(rotation: number): void {
        this.rotation = rotation;
    }
}
