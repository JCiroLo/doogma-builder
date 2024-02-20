import { r as registerInstance, h, e as Host } from './index-55235861.js';

const doogmaImageSwatchesCss = ".doogma-nav-component-container label>.selection{display:block;font-size:0.85rem;font-weight:normal;margin-top:0.25rem}.doogma-nav-component-container .doogma-image-swatch-list,.doogma-nav-component-container .doogma-swatch-list{display:flex}.doogma-nav-component-container .doogma-image-swatch-list .doogma-swatch-list--item,.doogma-nav-component-container .doogma-swatch-list .doogma-swatch-list--item{cursor:pointer;border:2px solid transparent}.doogma-nav-component-container .doogma-image-swatch-list .doogma-swatch-list--item:last-child,.doogma-nav-component-container .doogma-swatch-list .doogma-swatch-list--item:last-child{margin-right:0}.doogma-nav-component-container .doogma-image-swatch-list .doogma-swatch-list--item.active,.doogma-nav-component-container .doogma-swatch-list .doogma-swatch-list--item.active{border:2px solid #000}.doogma-nav-component-container .doogma-image-swatch-list .doogma-swatch-list--item.circular,.doogma-nav-component-container .doogma-swatch-list .doogma-swatch-list--item.circular{border-radius:50%;overflow:hidden}";

const DoogmaImageSwatches = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Image Swatches';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.param = 'imageswatch1';
    this.size = '32';
    this.circular = 'no'; // true for circular swatches
    this.gap = '.25'; // rem
    this.itemsPlacement = 'inline'; //block,grid2,grid3x,grid4x
    this.showActiveSelection = 'no'; //yes,no
    this.classes = [
      'doogma-nav-component-container',
      'doogma-image-swatches-container',
    ];
  }
  componentWillLoad() {
    //console.log(JSON.parse(this.swatches));
    this.activeSelection = '';
    this.swatchesArr = JSON.parse(this.items);
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
  listenDoogmaImageSwatchComponentUpdate(event) {
    //console.log(event);
    if ('dp-' + this.param === event.detail.param) {
      this.activeSelection = event.detail.label;
    }
  }
  render() {
    let labelMarginTop = this.labelPlacement === 'inline' ? this.gap : 0;
    let componentMargins = this.labelPlacement === 'block' ? 0 : this.gap;
    return (h(Host, { class: "doogma-swatches" }, h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? (h("label", { style: { marginTop: '-' + labelMarginTop + 'rem' } }, this.label, this.showActiveSelection === 'yes' && this.activeSelection !== '' ? (h("span", { class: "selection" }, this.activeSelection)) : (''))) : (''), h("div", { class: "doogma-image-swatch-list doogma-swatch-list doogma-control-items", style: { marginRight: '-' + componentMargins + 'rem', marginLeft: '0' } }, this.swatchesArr.map((swatch) => (h("doogma-image-swatch", { param: this.param, name: swatch['name'], value: swatch['value'], selected: swatch['selected'] !== undefined ? 'yes' : 'no', size: this.size, circular: this.circular, gap: this.gap, src: swatch['src'], label: swatch['label'] })))))));
  }
};
DoogmaImageSwatches.style = doogmaImageSwatchesCss;

export { DoogmaImageSwatches as doogma_image_swatches };
