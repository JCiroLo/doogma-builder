import { r as registerInstance, h } from './index-55235861.js';

const doogmaRadioGroupCss = ".doogma-nav-component-container.doogma-ci-inline .doogma-control-items{display:flex;flex-wrap:wrap}.doogma-nav-component-container.doogma-ci-inline .doogma-control-items .doogma-control-item{margin-right:0.5rem}.doogma-nav-component-container.doogma-ci-block .doogma-control-items{display:block}.doogma-nav-component-container.doogma-ci-block .doogma-control-items .doogma-control-item{display:block;margin-bottom:0.25rem}.doogma-nav-component-container .multitext-container{display:flex;flex-direction:column}";

const DoogmaRadioGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Radio Group';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.groupParam = 'radio1';
    this.param = 'radiogroup1';
    this.gap = '.25'; // rem
    this.itemsPlacement = 'inline'; //block,grid2,grid3x,grid4x
    this.classes = ['doogma-nav-component-container doogma-radio-group-container'];
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
  listenDoogmaRadioSwatchComponentUpdated(event) {
    //console.log(event);
    if ('dp-' + this.param === event.detail.param) {
      this.activeSelection = event.detail.value;
    }
  }
  render() {
    let labelMarginTop = this.labelPlacement === 'inline' ? this.gap : 0;
    let componentMargins = this.labelPlacement === 'block' ? 0 : this.gap;
    return (h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? (h("label", { style: { marginTop: '-' + labelMarginTop + 'rem' } }, this.label)) : (''), h("div", { class: "doogma-radio-group-list doogma-control-items", style: {
        marginRight: '-' + componentMargins + 'rem',
        marginLeft: '0',
      } }, this.itemsArray.map((item) => (h("doogma-radio", { class: "doogma-control-item", "group-param": this.groupParam, param: item['param'], name: item['name'], value: item['value'], label: item['label'], multiText: item['multiText'], customParameters: item['custom-parameters'], customtitle: item['title'], body: item['body'], gap: this.gap, selected: item['selected'] !== undefined ? 'yes' : 'no' }))))));
  }
};
DoogmaRadioGroup.style = doogmaRadioGroupCss;

export { DoogmaRadioGroup as doogma_radio_group };
