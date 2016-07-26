import Entity from './Entity';
import tinyColor from 'tinycolor2';

export default class Visualizer extends Entity {
  constructor(store) {
    super(store);

    this.graphics = new PIXI.Graphics();
    this.xRange = 1200;
    this.yRange = 200;
    this.freqData = [];
    this.logged = false;
    var state = store.getState();
    state.audioController.observables['visualizer'].subscribe((freqData) => {
      if (freqData[0] < Infinity && freqData[0] > -Infinity) {
        this.freqData = freqData;
      }
    });


    this.container.addChild(this.graphics);
  }
  render() {
    this.graphics.clear();
    this.freqData.map((freq, i, freqData) => {
      var width = this.xRange / freqData.length;
      var dbPerc = (freq + 115) / 180;
      var height = dbPerc * 200;
      var x = width * i;
      var hslaString = `hsla(${220 + Math.max(dbPerc * 100, 0)}, ${ 0 + i / freqData.length * 75}, 50%, 1)`;
      var color = tinyColor(hslaString).toHexString();
      color = parseInt(color.substring(1), 16);
      this.graphics.beginFill(color);
      this.graphics.drawRect(x, 0, width, height);
      this.graphics.drawRect(x, 600, width, -height);
      this.graphics.endFill();
    });
  }
}
