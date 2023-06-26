import { r as registerInstance, h, e as Host } from './index-55235861.js';

const DoogmaCheckboxCounter = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.groupParam = 'checkboxgroup1';
    this.param = 'checkbox-counter1';
    this.countParam = '';
    this.name = 'checkboxcountergroup1';
    this.value = 'opt1';
    this.label = 'Checkbox Option';
    this.placeholder = ''; // inline
    this.type = 'number'; //input type
    this.icon = '';
    this.span = '';
    this.gap = '.5'; // rem
    this.selected = 'no'; // yes,no
    this.iconStart = '-'; //Icon button start
    this.iconEnd = '+'; //Icon button start
    this.min = -10; //Icon button start
    this.max = +10; //Icon button start
    this.step = 1; //Icon button start
    this.velocity = 50; //Icon button start
    this.customParameters = {};
    this.class = 'doogma-checkbox-counter';
    this.defParamVal = 0;
    this.controlClasses = ['doogma-control-item', 'doogma-checkbox-counter'];
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
        // window['doogmaParameters']['dp-' + this.param + '-quantity'] = val;
        if (changeIn) {
          let params = {};
          params['dp-' + this.param] = val;
          params['dp-' + this.groupParam] = val;
          let event = new CustomEvent('doogmaParametersChangeIn', {
            detail: { doogmaParameters: params },
          });
          document.dispatchEvent(event);
          //console.log(window["doogmaParameters"]);
        }
        else {
          window['doogmaParameters']['dp-' + this.param] = 0;
        }
      }
    };
    this.onDoogmaNumberChanged = (event) => {
      event.preventDefault();
      let val = event.target.value;
      //console.log(event,this.value);
      this.setText(val);
    };
    this.decreaseInputNumberClick = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-checkbox-counter[group-param="' + this.param + '"] input[type="number"]');
      let decreaseInput = Number(counterInput.value) - this.step;
      if (decreaseInput >= this.min) {
        counterInput.value = decreaseInput.toString();
        this.setText(counterInput.value);
      }
    };
    this.increaseInputNumberClick = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-checkbox-counter[group-param="' + this.param + '"] input[type="number"]');
      let addInput = Number(counterInput.value) + this.step;
      if (addInput <= this.max) {
        counterInput.value = addInput.toString();
        this.setText(counterInput.value);
      }
    };
    this.decreaseInputNumber = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-checkbox-counter[group-param="' + this.param + '"] input[type="number"]');
      let decreaseInput;
      this.interval = setInterval(() => {
        decreaseInput = Number(counterInput.value) - this.step;
        if (decreaseInput >= this.min) {
          counterInput.value = decreaseInput.toString();
          this.setText(counterInput.value);
        }
      }, this.velocity);
    };
    this.increaseInputNumber = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-checkbox-counter[group-param="' + this.param + '"] input[type="number"]');
      let increaseInput;
      this.interval = setInterval(() => {
        increaseInput = Number(counterInput.value) + this.step;
        if (increaseInput <= this.max) {
          counterInput.value = increaseInput.toString();
          this.setText(counterInput.value);
        }
      }, this.velocity);
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
      case '0':
        this.defaultParamValue = 0;
        break;
      case 'null':
        this.defaultParamValue = null;
        break;
      default:
        this.defaultParamValue = 0;
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
  setText(value) {
    this.value = value;
    let checkboxEl = document.querySelector('doogma-checkbox-counter[group-param="' + this.param + '"] input[type="checkbox"]');
    if (window.hasOwnProperty('doogmaParameters') && checkboxEl.checked) {
      if (typeof window['doogmaParameters'] !== undefined) {
        window['doogmaParameters']['dp-' + this.param] = this.value;
      }
      else {
        window['doogmaParameters']['dp-' + this.param] = this.value;
      }
      let params = {};
      params['dp-' + this.param] = this.value;
      let event = new CustomEvent('doogmaParametersChangeIn', {
        detail: { doogmaParameters: params },
      });
      document.dispatchEvent(event);
      //console.log(window["doogmaParameters"]);
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
    return (h(Host, { class: `${this.class}`, style: { marginRight: this.gap + 'rem', marginBottom: this.gap + 'rem' } }, h("div", { class: "doogma-control" }, h("input", Object.assign({ type: "checkbox", name: this.name, value: this.value, class: this.class, checked: selected, onChange: ev => this.checkboxChangeHandler(ev) }, this.customParameters)), this.image && h("img", { src: this.image }), h("label", null, this.label), h("div", { class: "content-container" }, h("i", null, this.icon), h("span", null, this.span)), h("div", { class: "doogma-counter-container" }, h("button", { class: "decrease", onMouseDown: ev => this.decreaseInputNumber(ev), onMouseUp: () => clearInterval(this.interval), onClick: ev => this.decreaseInputNumberClick(ev) }, this.iconStart), h("input", { type: this.type, name: this.name, value: this.value, placeholder: this.placeholder !== '' ? this.placeholder : '', class: this.controlClasses.join(' '), onKeyUp: ev => this.onDoogmaNumberChanged(ev), onChange: ev => this.onDoogmaNumberChanged(ev) }), h("button", { class: "increase", onMouseDown: ev => this.increaseInputNumber(ev), onMouseUp: () => clearInterval(this.interval), onClick: ev => this.increaseInputNumberClick(ev) }, this.iconEnd)))));
  }
};

export { DoogmaCheckboxCounter as doogma_checkbox_counter };
