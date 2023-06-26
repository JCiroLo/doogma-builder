import { r as registerInstance, h, e as Host } from './index-55235861.js';

const DoogmaCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.groupParam = 'checkboxgroup1';
    this.param = 'checkbox1';
    this.name = 'checkboxgroup1';
    this.value = 'opt1';
    this.label = '';
    this.gap = '.5'; // rem
    this.selected = 'no'; // yes,no
    this.class = 'doogma-checkbox';
    this.defParamVal = false;
    this.select = (val, changeIn = true) => {
      let value = val === 'true';
      this.selected = 'yes';
      if (value) {
        this.setParams(value, changeIn);
      }
      else {
        this.setParams(val, changeIn);
      }
    };
    this.setParams = (val, changeIn = true) => {
      if (window.hasOwnProperty('doogmaParameters')) {
        window['doogmaParameters']['dp-' + this.groupParam] = val;
        window['doogmaParameters']['dp-' + this.param] = val;
        if (changeIn) {
          let params = {};
          params['dp-' + this.param] = this.value;
          params['dp-' + this.groupParam] = this.value;
          let event = new CustomEvent('doogmaParametersChangeIn', {
            detail: { doogmaParameters: params },
          });
          document.dispatchEvent(event);
          //console.log(window["doogmaParameters"]);
        }
        else {
          let params = {};
          window['doogmaParameters']['dp-' + this.param] = false;
          params['dp-' + this.param] = false;
          //  params['dp-' + this.groupParam] = this.value;
          let event = new CustomEvent('doogmaParametersChangeIn', {
            detail: { doogmaParameters: params },
          });
          document.dispatchEvent(event);
        }
      }
    };
    this.checkboxChangeHandler = (event) => {
      let isChecked = event.target.checked;
      let val = event.target.value;
      //console.log(isChecked,val);
      if (isChecked) {
        //this.select(val, false);
        this.setParams(val, true);
      }
      else {
        //this.select(val, true);
        this.setParams(val, false);
      }
    };
  }
  componentWillLoad() {
    switch (this.defaultParamValue) {
      case 'true':
        this.defaultParamValue = true;
        break;
      case 'false':
        this.defaultParamValue = false;
        break;
      case 'null':
        this.defaultParamValue = null;
        break;
      default:
        this.defaultParamValue = false;
    }
    this.defParamVal = this.defaultParamValue;
    //let val = (this.value === "true");
    //true false mode
    if (this.selected === 'yes') {
      this.select(this.value);
    }
    else {
      this.setParams(this.defParamVal);
    }
  }
  listenDoogmaParametersChangeOut(event) {
    //console.log(event);
    if (event.detail.hasOwnProperty('doogmaParameters')) {
      if (event.detail.doogmaParameters.hasOwnProperty('dp-' + this.param)) {
        let val = event.detail.doogmaParameters['dp-' + this.param];
        if (this.value === val) {
          this.select(val);
        }
      }
    }
  }
  render() {
    let selected = this.selected === 'yes' ? true : false;
    //let value = this.value === "true" ? true : this.value;
    return (h(Host, { class: `${this.class}`, style: { marginRight: this.gap + 'rem', marginBottom: this.gap + 'rem' } }, h("div", { class: "doogma-control" }, h("input", { type: "checkbox", name: this.name, value: this.value, class: this.class, checked: selected, onChange: ev => this.checkboxChangeHandler(ev) }), this.image && h("img", { src: this.image }), h("label", null, this.label))));
  }
};

export { DoogmaCheckbox as doogma_checkbox };
