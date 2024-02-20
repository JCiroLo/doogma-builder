import { r as registerInstance, h, e as Host } from './index-55235861.js';

const DoogmaRadio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.groupParam = 'radio1';
    this.param = 'radio1';
    this.name = 'radiogroup1';
    this.value = 'opt1';
    this.label = 'Radio Option';
    this.gap = '.5'; // rem
    this.selected = 'no'; // yes,no
    this.multiText = 'no'; // yes,no
    this.customtitle = '';
    this.body = [];
    this.customParameters = {};
    this.class = 'doogma-radio';
    this.classes = ['radio-swatch', 'doogma-swatch-list--item'];
    this.isActive = false;
    this.radioChangeHandler = (event) => {
      let val = event.target.value;
      //console.log(val);
      this.select(val);
    };
  }
  componentWillLoad() {
    if (this.selected === 'yes') {
      this.select(this.value);
    }
  }
  watchisActiveHandler() {
    if (this.isActive) {
      this.classes.push('active');
    }
    else {
      this.classes = this.classes.filter(function (f) {
        return f !== 'active';
      });
    }
  }
  select(val, changeIn = true) {
    this.isActive = true;
    this.selected = 'yes';
    document.dispatchEvent(new CustomEvent('doogmaRadioSwatchComponentUpdated', {
      detail: {
        param: 'dp-' + this.param,
        value: this.value,
        customtitle: this.customtitle,
        name: this.name,
      },
    }));
    if (window.hasOwnProperty('doogmaParameters')) {
      if (typeof window['doogmaParameters'] !== undefined) {
        window['doogmaParameters']['dp-' + this.groupParam] = val;
        window['doogmaParameters']['dp-' + this.param] = val;
      }
      else {
        window['doogmaParameters']['dp-' + this.groupParam] = val;
        window['doogmaParameters']['dp-' + this.param] = val;
      }
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
    }
  }
  listenDoogmaRadioSwatchComponentUpdated(ev) {
    //console.log(ev);
    if ('dp-' + this.param === ev.detail.param && this.value !== ev.detail.value) {
      this.isActive = false;
    }
  }
  listenDoogmaParametersChangeOut(event) {
    //console.log(event);
    if (event.detail.hasOwnProperty('doogmaParameters')) {
      if (event.detail.doogmaParameters.hasOwnProperty('dp-' + this.param)) {
        let val = event.detail.doogmaParameters['dp-' + this.param];
        if (this.value === val) {
          this.select(val, false);
        }
      }
    }
  }
  render() {
    let selected = this.selected === 'yes' ? true : false;
    return (h(Host, { class: `${this.class}`, style: {
        marginRight: this.gap + 'rem',
        marginBottom: this.gap + 'rem',
      } }, h("div", { class: "doogma-control" }, h("label", { style: { display: 'flex' } }, h("input", Object.assign({ type: "radio", name: this.name, value: this.value, class: this.class, checked: selected, onChange: ev => this.radioChangeHandler(ev) }, this.customParameters)), this.multiText == 'yes' && (h("div", { class: "multitext-container" }, h("p", { class: "title" }, this.customtitle && `${this.customtitle}`), this.body && this.body.map(body => h("p", { class: "body" }, body)))), this.multiText == 'no' && `${this.customtitle}`))));
  }
  static get watchers() { return {
    "isActive": ["watchisActiveHandler"]
  }; }
};

export { DoogmaRadio as doogma_radio };
