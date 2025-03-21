import "./style.css";
import "phaser";
import DemoShapes from "./scene/DemoShapes";
import DemoEdges from "./scene/DemoEdges";
import { PhaserPlanck } from "./phaser-planck";
import DemoEvents from "./scene/DemoEvents";
import { createGui } from "./scene/util";
import DemoConveyer from "./scene/DemoConveyer";
import DemoForce from "./scene/DemoForce";
import DemoFriction from "./scene/DemoFriction";
import DemoSandbox from "./scene/DemoSandbox";
import DemoChain from "./scene/DemoChain";
import DemoDistanceJoint from "./scene/DemoDistanceJoint";
import DemoRevoluteJoint from "./scene/DemoRevoluteJoint";
import DemoQuarker from "./quarker/DEMOQUARKER";

// Create reference to 'game' to be set onload
let game: Phaser.Game | undefined;
const DEFAULT_WIDTH = 1200;
const DEFAULT_HEIGHT = 900;

const config = {
  type: Phaser.WEBGL,
  backgroundColor: "#000000",
  scale: {
    parent: "app",
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  },
  audio: {
    noAudio: true,
  },
  scene: [
    DemoQuarker,
    DemoSandbox,
    DemoShapes,
    DemoEdges,
    DemoEvents,
    DemoConveyer,
    DemoForce,
    DemoFriction,
    DemoChain,
    DemoDistanceJoint,
    DemoRevoluteJoint,
  ],
  plugins: {
    scene: [{ key: "PhaserPlanck", plugin: PhaserPlanck, mapping: "planck" }],
  },
  render: {
    antialias: true,
  },
};

window.addEventListener("load", () => {
  game = new Phaser.Game(config);
  createGui(game);
});
