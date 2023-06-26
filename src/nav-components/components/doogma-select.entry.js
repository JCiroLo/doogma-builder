import { r as registerInstance, h } from './index-55235861.js';

const doogmaSelect = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Select';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.param = 'selectbox1';
    this.name = 'selectbox1';
    this.value = '';
    this.dataIdentifier = 'doogma-select';
    this.classes = ['doogma-nav-component-container', 'doogma-select-container'];
    this.controlClasses = ['doogma-control-item', 'doogma-select'];
    this.selectChangeHandler = (event) => {
      let val = event.target.value;
      this.select(val);
    };
  }
  componentWillLoad() {
    this.optionsArr = JSON.parse(this.items);
    if (this.labelPlacement === 'inline') {
      this.classes.push('doogma-inline');
    }
    else {
      this.classes = this.classes.filter(function (f) {
        return f !== 'doogma-inline';
      });
    }
    this.controlClasses.push('doogma-layer' + 'dp-' + this.param);
    /* if (this.selected === 'yes') {
      this.select(this.value);
    } */
    this.optionsArr.map((option) => {
      if (option['selected'] === 'yes') {
        // console.log('Selected option:', option);
        this.select(option['value']);
      }
    });
  }
  listenDoogmaParametersChangeOut(event) {
    //console.log(event);
    if (event.detail.hasOwnProperty('doogmaParameters')) {
      if (event.detail.doogmaParameters.hasOwnProperty('dp-' + this.param)) {
        let val = event.detail.doogmaParameters['dp-' + this.param];
        this.select(val);
        this.optionsArr.map((option) => {
          if (option['value'] === val) {
            option['selected'] = 'yes';
          }
        });
        this.items = JSON.stringify(this.optionsArr);
      }
    }
  }
  listenDoogmaSelectComponentUpdated(event) {
    if ('dp-' + this.param === event.detail.param) {
      console.log('Updated:', event.detail.value, event);
      this.activeSelection = event.detail.value;
    }
  }
  select(val, changeIn = true) {
    if (window.hasOwnProperty('doogmaParameters')) {
      if (typeof window['doogmaParameters'] !== undefined) {
        // window['doogmaParameters']['dp-'+this.groupParam] = val;
        window['doogmaParameters']['dp-' + this.param] = val;
      }
      else {
        // window['doogmaParameters']['dp-'+this.groupParam] = val;
        window['doogmaParameters']['dp-' + this.param] = val;
      }
      if (changeIn) {
        let params = {};
        params['dp-' + this.param] = val;
        let event = new CustomEvent('doogmaParametersChangeIn', {
          detail: { doogmaParameters: params },
        });
        document.dispatchEvent(event);
      }
    }
  }
  render() {
    return (h("div", { "data-idientifer": this.dataIdentifier, class: this.classes.join(' ') }, this.hideLabel === 'no' ? h("label", null, this.label) : '', h("div", { class: "doogma-control-wrapper" }, h("select", { onChange: ev => this.selectChangeHandler(ev), class: "doogma-select" }, this.optionsArr.map((opData) => {
      return (h("option", { class: "doogma-select-option", selected: opData['selected'] == 'yes' ? true : false, value: opData['value'] }, opData['label']));
    })))));
  }
};

export { doogmaSelect as doogma_select };
