import { r as registerInstance, h } from './index-55235861.js';

const doogmaSimpleTextCss = "";

const doogmaSimpleText = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'My Text';
    this.labelPlacement = 'block'; // inline
    this.hideLabel = 'no'; // yes,no
    this.placeholder = ''; // inline
    this.param = 'text1';
    this.name = 'text1';
    this.value = '';
    this.type = 'text'; //input type
    this.classes = ['doogma-nav-component-container', 'doogma-simple-text-container'];
    this.controlClasses = ['doogma-control-item', 'doogma-simple-text'];
    this.onDoogmaSimpleTextChanged = (event) => {
      event.preventDefault();
      let val = event.target.value;
      //console.log(event,this.value);
      this.setText(val);
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
    return (h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? h("label", null, this.label) : '', h("div", { class: "doogma-control-wrapper" }, h("input", { type: this.type, name: this.name, value: this.value, placeholder: this.placeholder !== '' ? this.placeholder : '', class: this.controlClasses.join(' '), onKeyUp: ev => this.onDoogmaSimpleTextChanged(ev), onChange: ev => this.onDoogmaSimpleTextChanged(ev) }))));
  }
};
doogmaSimpleText.style = doogmaSimpleTextCss;

export { doogmaSimpleText as doogma_simple_text };
