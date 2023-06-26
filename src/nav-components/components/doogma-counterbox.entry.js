import { r as registerInstance, h } from './index-55235861.js';

const doogmaCounterboxCss = "";

const doogmaSimpleText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'My Text';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.placeholder = ''; // inline
    this.param = 'counter';
    this.name = 'counter';
    this.value = 0;
    this.type = 'number'; //input type
    this.iconStart = '-'; //Icon button start
    this.iconEnd = '+'; //Icon button start
    this.min = -10; //Icon button start
    this.max = +10; //Icon button start
    this.step = 1; //Icon button start
    this.velocity = 50; //Icon button start
    this.classes = ['doogma-nav-component-container', 'doogma-counterbox-container'];
    this.controlClasses = ['doogma-control-item', 'doogma-counterbox'];
    this.onDoogmaNumberChanged = (event) => {
      event.preventDefault();
      let val = event.target.value;
      //console.log(event,this.value);
      this.setText(val);
    };
    this.decreaseInputNumberClick = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-counterbox[param="' + this.param + '"] input[type="number"]');
      let decreaseInput = Number(counterInput.value) - this.step;
      if (decreaseInput >= this.min) {
        counterInput.value = decreaseInput.toString();
        this.setText(counterInput.value);
      }
    };
    this.increaseInputNumberClick = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-counterbox[param="' + this.param + '"] input[type="number"]');
      let addInput = Number(counterInput.value) + this.step;
      if (addInput <= this.max) {
        counterInput.value = addInput.toString();
        this.setText(counterInput.value);
      }
    };
    this.decreaseInputNumber = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-counterbox[param="' + this.param + '"] input[type="number"]');
      let decreaseInput;
      this.interval = setInterval(() => {
        decreaseInput = Number(counterInput.value) - 1;
        if (decreaseInput >= this.min) {
          counterInput.value = decreaseInput.toString();
          this.setText(counterInput.value);
        }
      }, this.velocity);
    };
    this.increaseInputNumber = (event) => {
      event.preventDefault();
      const counterInput = document.querySelector('doogma-counterbox[param="' + this.param + '"] input[type="number"]');
      let increaseInput;
      this.interval = setInterval(() => {
        increaseInput = Number(counterInput.value) + 1;
        if (increaseInput <= this.max) {
          counterInput.value = increaseInput.toString();
          this.setText(counterInput.value);
        }
      }, this.velocity);
    };
  }
  componentWillLoad() {
    if (this.labelPlacement === 'inline') {
      this.classes.push('doogma-inline');
    }
    else {
      this.classes = this.classes.filter(function (f) {
        return f !== 'doogma-inline';
      });
    }
    this.controlClasses.push('doogma-layer' + 'dp-' + this.param);
    this.setText(this.value);
  }
  setText(value) {
    this.value = value;
    //console.log('input changed: ', (event.target as HTMLInputElement).value);
    if (window.hasOwnProperty('doogmaParameters')) {
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
        this.value = val;
      }
    }
  }
  render() {
    return (h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? h("label", null, this.label) : '', h("div", { class: "doogma-control-wrapper" }, h("button", { class: "decrease", onMouseDown: ev => this.decreaseInputNumber(ev), onTouchStart: ev => this.decreaseInputNumber(ev), onMouseUp: () => clearInterval(this.interval), onTouchEnd: () => clearInterval(this.interval), onClick: ev => this.decreaseInputNumberClick(ev) }, this.iconStart), h("input", { type: this.type, name: this.name, value: this.value, placeholder: this.placeholder !== '' ? this.placeholder : '', class: this.controlClasses.join(' '), onKeyUp: ev => this.onDoogmaNumberChanged(ev), onChange: ev => this.onDoogmaNumberChanged(ev) }), h("button", { class: "increase", onMouseDown: ev => this.increaseInputNumber(ev), onTouchStart: ev => this.increaseInputNumber(ev), onMouseUp: () => clearInterval(this.interval), onTouchEnd: () => clearInterval(this.interval), onClick: ev => this.increaseInputNumberClick(ev) }, this.iconEnd))));
  }
};
doogmaSimpleText.style = doogmaCounterboxCss;

export { doogmaSimpleText as doogma_counterbox };
