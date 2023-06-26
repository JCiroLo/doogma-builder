import { r as registerInstance, h, e as Host } from './index-55235861.js';

const doogmaColorSwatchesCss = ".doogma-color-swatch-list,.doogma-swatch-list{display:flex;flex-wrap:wrap;}.doogma-color-swatch-list .doogma-swatch-list--item,.doogma-swatch-list .doogma-swatch-list--item{cursor:pointer;border:2px solid transparent}.doogma-color-swatch-list .doogma-swatch-list--item.color-swatch,.doogma-swatch-list .doogma-swatch-list--item.color-swatch{border:2px solid #ccc}.doogma-color-swatch-list .doogma-swatch-list--item:last-child,.doogma-swatch-list .doogma-swatch-list--item:last-child{margin-right:0}.doogma-color-swatch-list .doogma-swatch-list--item.active,.doogma-swatch-list .doogma-swatch-list--item.active{border:2px solid #000}.doogma-color-swatch-list .doogma-swatch-list--item.circular,.doogma-swatch-list .doogma-swatch-list--item.circular{border-radius:50%;overflow:hidden}";

const doogmaColorSwatches = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Color Swatches';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.param = 'colorSwatch1';
    this.size = '32';
    this.circular = 'no'; // true for circular swatches
    this.gap = '.25'; // rem
    this.itemsPlacement = 'inline'; //block,grid2,grid3x,grid4x
    this.showActiveSelection = 'no'; //yes,no
    this.classes = [
      'doogma-nav-component-container',
      'doogma-color-swatches-container',
    ];
  }
  componentWillLoad() {
    //console.log(JSON.parse(this.items));
    this.itemsArray = JSON.parse(this.items);
    if (this.labelPlacement === 'inline') {
      this.classes.push('doogma-inline');
    }
    else {
      this.classes = this.classes.filter(function (f) {
        return f !== 'doogma-inline';
      });
    }
    switch (this.itemsPlacement) {
      case 'block':
        this.classes.push('doogma-ci-block');
        break;
      case 'inline':
        this.classes.push('doogma-ci-inline');
        break;
      case 'grid2x':
        this.classes.push('doogma-ci-grid2x');
        break;
      case 'grid3x':
        this.classes.push('doogma-ci-grid3x');
        break;
      case 'grid4x':
        this.classes.push('doogma-ci-grid4x');
        break;
      default:
        this.classes.push('doogma-ci-block');
        break;
    }
  }
  listenDoogmaColorSwatchComponentUpdate(event) {
    //console.log(event);
    if ('dp-' + this.param === event.detail.param) {
      this.activeSelection = event.detail.label;
    }
  }
  render() {
    let labelMarginTop = this.labelPlacement === 'inline' ? this.gap : 0;
    let componentMargins = this.labelPlacement === 'block' ? 0 : this.gap;
    return (h(Host, { class: "doogma-swatches" }, h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? (h("label", { style: { marginTop: '-' + labelMarginTop + 'rem' } }, this.label, this.showActiveSelection === 'yes' && this.activeSelection !== '' ? (h("span", { class: "selection" }, this.activeSelection)) : (''))) : (''), h("div", { class: "doogma-color-swatch-list doogma-control-items", style: { marginRight: '-' + componentMargins + 'rem', marginLeft: '0' } }, this.itemsArray.map((item) => (h("doogma-color-swatch", { class: "doogma-control-item", param: this.param, name: item['name'], value: item['value'], label: item['label'], selected: item['selected'] !== undefined ? 'yes' : 'no', size: this.size, circular: this.circular, gap: this.gap })))))));
  }
};
doogmaColorSwatches.style = doogmaColorSwatchesCss;

export { doogmaColorSwatches as doogma_color_swatches };
