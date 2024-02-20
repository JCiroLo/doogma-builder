import { r as registerInstance, h } from './index-55235861.js';

const doogmaNavControlsCss = ".doogma-nav-controls{display:flex;justify-content:center}.doogma-nav-controls .doogma-nav-control button{background:#eee;border:1px solid #eee;padding:0.75rem 1.5rem;cursor:pointer;font-size:1rem;margin-right:0.5rem;transition:all 0.35s}.doogma-nav-controls .doogma-nav-control button:hover{background:#000;color:#fff}.doogma-nav-controls .doogma-nav-control.active button{background:#000;color:#fff}.doogma-nav-controls.doogma-display-block{flex-direction:column;margin:0 auto;text-align:center}.doogma-nav-controls.doogma-display-block .doogma-nav-control button{margin-right:0;margin-bottom:0.5rem}";

const DoogmaNavControls = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'navcontrol';
    this.defZoomX = '0';
    this.defZoomY = '0';
    this.defZoomHeight = '750';
    this.defZoomWidth = '750';
    this.viewType = 'button'; // button / image
    this.display = 'inline'; // inline / block
    this.class = '';
    this.classes = ['doogma-nav-component-container', 'doogma-nav-controls'];
  }
  componentWillLoad() {
    if (this.class.length > 0) {
      let classes = this.class.split(' ');
      this.classes = this.classes.concat(classes);
    }
    if (this.display === 'inline') {
      this.classes.push('doogma-display-inline');
    }
    else if (this.display === 'block') {
      this.classes.push('doogma-display-block');
    }
    this.itemsArray = JSON.parse(this.items);
  }
  render() {
    return (h("div", { class: this.classes.join(' ') }, this.itemsArray.map((item, index) => (h("doogma-nav-control", { param: this.param, "zoom-x": item['zoomX'], "zoom-y": item['zoomY'], "zoom-width": item['zoomWidth'], "zoom-height": item['zoomHeight'], label: item['label'], "view-type": this.viewType, class: item['class'], "control-id": this.param + index, "controls-nav": item['controlsNav'], selected: item['selected'] !== undefined ? 'yes' : 'no' })))));
  }
};
DoogmaNavControls.style = doogmaNavControlsCss;

export { DoogmaNavControls as doogma_nav_controls };
