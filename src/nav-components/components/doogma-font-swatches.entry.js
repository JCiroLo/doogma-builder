import { r as registerInstance, h, e as Host } from './index-55235861.js';

const doogmaFontSwatchesCss = ".doogma-font-swatch-list .doogma-swatch-list--item,.doogma-swatch-list .doogma-swatch-list--item{display:flex;align-items:center}.doogma-font-swatch-list .doogma-swatch-list--item>span,.doogma-swatch-list .doogma-swatch-list--item>span{display:flex;align-items:center;justify-content:center}";

const DoogmaFontSwatches = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Font Swatches';
    this.labelPlacement = 'block'; // inline
    this.param = 'fontswatch1';
    this.size = '32';
    this.circular = 'no'; // true for circular swatches
    this.gap = '.25'; // rem
    this.backColor = '#000000'; // rem
    this.frontColor = '#ffffff'; // rem
    this.itemsPlacement = 'inline'; //block,grid2,grid3x,grid4x
    this.showActiveSelection = 'no'; //yes,no
    this.name = 'font-swatch';
    this.classes = ['doogma-nav-component-container', 'doogma-font-swatches-container'];
  }
  componentWillLoad() {
    //console.log(JSON.parse(this.swatches));
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
  listenDoogmaFontSwatchComponentUpdated(event) {
    //console.log(event);
    if ('dp-' + this.param === event.detail.param) {
      this.activeSelection = event.detail.value;
    }
  }
  render() {
    let labelMarginTop = this.labelPlacement === 'inline' ? this.gap : 0;
    let componentMargins = this.labelPlacement === 'block' ? 0 : this.gap;
    return (h(Host, { class: "doogma-swatches" }, h("div", { class: this.classes.join(' ') }, h("label", { style: { marginTop: '-' + labelMarginTop + 'rem' } }, this.label, this.showActiveSelection === 'yes' && this.activeSelection !== '' ? (h("span", { class: "selection" }, this.activeSelection)) : ('')), h("div", { class: "doogma-font-swatch-list doogma-swatch-list doogma-control-items", style: { marginRight: '-' + componentMargins + 'rem', marginLeft: '0' } }, this.itemsArray.map((item) => (h("doogma-font-swatch", { class: "doogma-control-item", param: this.param, name: item['name'], value: item['value'], label: item['label'], selected: item['selected'] !== undefined ? 'yes' : 'no', size: this.size, circular: this.circular, gap: this.gap, backColor: this.backColor, frontColor: this.frontColor })))))));
  }
};
DoogmaFontSwatches.style = doogmaFontSwatchesCss;

export { DoogmaFontSwatches as doogma_font_swatches };
