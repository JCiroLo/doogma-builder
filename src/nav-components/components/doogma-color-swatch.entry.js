import { r as registerInstance, h, e as Host } from './index-55235861.js';

const doogmaColorSwatch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'colorSwatch1';
    this.name = 'Black';
    this.label = 'Color Name';
    this.value = '000000';
    this.size = '32'; // could be 24,28,64,75 etc
    this.circular = 'no'; // yes for circular swatches
    this.gap = '.5'; // rem
    this.selected = 'no'; // yes,no
    this.isActive = false;
    this.class = 'color-swatch';
    this.classes = ['color-swatch', 'doogma-swatch-list--item'];
  }
  //@Prop({mutable:true}) size : number = "24";
  componentWillLoad() {
    if (this.circular === 'yes') {
      this.classes.push('circular');
    }
    else {
      this.classes = this.classes.filter(function (f) {
        return f !== 'circular';
      });
    }
    if (this.selected === 'yes') {
      this.selectSwatch();
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
  watchCircular() {
    if (this.circular === 'yes') {
      this.classes.push('circular');
    }
    else {
      this.classes = this.classes.filter(function (f) {
        return f !== 'circular';
      });
    }
  }
  selectSwatch(changeIn = true) {
    this.isActive = true;
    document.dispatchEvent(new CustomEvent('doogmaColorSwatchComponentUpdated', {
      detail: {
        param: 'dp-' + this.param,
        value: this.value,
        label: this.label,
        name: this.name,
      },
    }));
    //doogmaparams event
    if (window.hasOwnProperty('doogmaParameters')) {
      if (typeof window['doogmaParameters'] !== undefined) {
        window['doogmaParameters']['dp-' + this.param] = this.name;
      }
      else {
        window['doogmaParameters']['dp-' + this.param] = this.name;
      }
      if (changeIn) {
        let params = {};
        params['dp-' + this.param] = this.name;
        let event = new CustomEvent('doogmaParametersChangeIn', {
          detail: { doogmaParameters: params },
        });
        document.dispatchEvent(event);
        //console.log(window["doogmaParameters"]);
      }
    }
  }
  colorSwatchSelectedHandler(event) {
    event.preventDefault();
    this.selectSwatch();
  }
  listenDoogmaColorSwatchComponentUpdated(ev) {
    //console.log(ev);
    if ('dp-' + this.param === ev.detail.param && this.name !== ev.detail.name) {
      this.isActive = false;
    }
  }
  listenDoogmaParametersChangeOut(event) {
    //console.log(event);
    if (event.detail.hasOwnProperty('doogmaParameters')) {
      if (event.detail.doogmaParameters.hasOwnProperty('dp-' + this.param)) {
        let val = event.detail.doogmaParameters['dp-' + this.param];
        if (this.name === val) {
          this.selectSwatch(false);
        }
      }
    }
  }
  render() {
    return (h(Host, { class: `${this.classes.join(' ')}`, style: { marginRight: this.gap + 'rem', marginBottom: this.gap + 'rem' } }, h("span", { onClick: ev => this.colorSwatchSelectedHandler(ev), title: this.label, style: {
        width: this.size + 'px',
        height: this.size + 'px',
        backgroundColor: '#' + this.value,
        display: 'flex',
      } })));
  }
  static get watchers() { return {
    "isActive": ["watchisActiveHandler"],
    "circular": ["watchCircular"]
  }; }
};

export { doogmaColorSwatch as doogma_color_swatch };
