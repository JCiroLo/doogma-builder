import { r as registerInstance, h } from './index-55235861.js';

const doogmaCheckboxCounterGroupCss = ".doogma-nav-component-container{margin-bottom:1rem}.doogma-nav-component-container>label{font-weight:bold;margin-bottom:0.5rem;display:block;font-size:1.15rem;font-family:inherit}.doogma-nav-component-container.doogma-inline{display:flex}.doogma-nav-component-container.doogma-inline>label{margin-bottom:0;margin-right:1rem}.doogma-nav-component-container.doogma-inline.doogma-ci-inline{align-items:center}.doogma-nav-component-container.doogma-ci-inline .doogma-control-items{display:flex;flex-wrap:wrap}.doogma-nav-component-container.doogma-ci-inline .doogma-control-items .doogma-control-item{margin-right:0.5rem}.doogma-nav-component-container.doogma-ci-block .doogma-control-items{display:block}.doogma-nav-component-container.doogma-ci-block .doogma-control-items .doogma-control-item{display:block;margin-bottom:0.25rem}";

const DoogmaCheckboxCounterGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Checkbox counter Group';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.groupParam = 'checkboxcountergroup1';
    this.param = 'checkboxcountergroup1';
    this.gap = '.25'; // rem
    this.itemsPlacement = 'inline'; //block,grid2,grid3x,grid4x
    this.classes = [
      'doogma-nav-component-container',
      'doogma-checkbox-counter-group-container',
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
  render() {
    let labelMarginTop = this.labelPlacement === 'inline' ? this.gap : 0;
    let componentMargins = this.labelPlacement === 'block' ? 0 : this.gap;
    return (h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? (h("label", { style: { marginTop: '-' + labelMarginTop + 'rem' } }, this.label)) : (''), h("div", { class: "doogma-checkbox-counter-group-list doogma-control-items", style: { marginRight: '-' + componentMargins + 'rem', marginLeft: '0' } }, this.itemsArray.map((item) => (h("doogma-checkbox-counter", { class: "doogma-control-item", "group-param": item['param'], param: item['param'], "default-param-value": this.defaultParamValue !== undefined ? this.defaultParamValue : false, name: item['name'], value: item['value'], label: item['label'], span: item['span'], image: item['image'], icon: item['icon'], iconStart: item['iconStart'], iconEnd: item['iconEnd'], min: item['min'], max: item['max'], step: item['step'], velocity: item['velocity'], gap: this.gap, customParameters: item['custom-parameters'], selected: item['selected'] !== undefined ? 'yes' : 'no' }))))));
  }
};
DoogmaCheckboxCounterGroup.style = doogmaCheckboxCounterGroupCss;

export { DoogmaCheckboxCounterGroup as doogma_checkbox_counter_group };
