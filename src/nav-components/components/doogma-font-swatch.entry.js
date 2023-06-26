import { r as registerInstance, h, e as Host } from './index-55235861.js';

const DoogmaFontSwatch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'fontswatch';
    this.name = 'Aa';
    this.label = 'Font Name';
    this.value = 'arial';
    this.size = '32'; // could be 24,28,64,75 etc
    this.circular = 'no'; // true for circular swatches
    this.gap = '.5'; // rem
    this.backColor = '#000000'; // rem
    this.frontColor = '#ffffff'; // rem
    this.selected = 'no'; // yes,no
    this.isActive = false;
    this.class = 'font-swatch';
    this.classes = ['font-swatch', 'doogma-swatch-list--item'];
    this.select = (changeIn = true) => {
      this.isActive = true;
      document.dispatchEvent(new CustomEvent('doogmaFontSwatchComponentUpdated', {
        detail: {
          param: 'dp-' + this.param,
          value: this.value,
          label: this.name,
          name: this.name,
        },
      }));
      if (window.hasOwnProperty('doogmaParameters')) {
        if (typeof window['doogmaParameters'] !== undefined) {
          window['doogmaParameters']['dp-' + this.param] = this.value;
        }
        else {
          window['doogmaParameters']['dp-' + this.param] = this.value;
        }
        if (changeIn) {
          let params = {};
          params['dp-' + this.param] = this.value;
          let event = new CustomEvent('doogmaParametersChangeIn', {
            detail: { doogmaParameters: params },
          });
          document.dispatchEvent(event);
        }
        //console.log(window["doogmaParameters"]);
      }
    };
  }
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
      this.select();
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
  /* select() {
    this.isActive = true;
    document.dispatchEvent(
      new CustomEvent('doogmaFontSwatchComponentUpdated', {
        detail: {
          param: 'dp-'+this.param,
          value: this.value,
          label: this.label,
          name: this.name,
        },
      }),
    );
    //doogmaparams event
    if (window.hasOwnProperty('doogmaParameters')) {
      if (typeof window['doogmaParameters'] !== undefined) {
        window['doogmaParameters']['dp-' + this.param] = this.value;
      } else {
        window['doogmaParameters']['dp-' + this.param] = this.value;
      }

      let params = {};
      params['dp-' + this.param] = this.value;
      let event = new CustomEvent('doogmaParametersChangeIn', {
        detail: { doogmaParameters: params },
      });
      document.dispatchEvent(event);
      console.log(window['doogmaParameters']);
    }
  } */
  fontSwatchSelectedHandler(event) {
    event.preventDefault();
    this.select();
  }
  listenDoogmaFontSwatchComponentUpdated(ev) {
    //console.log(ev);
    if ('dp-' + this.param === ev.detail.param && this.value !== ev.detail.value) {
      this.isActive = false;
    }
  }
  /* setParams = (val, changeIn = true) => {
    if (window.hasOwnProperty('doogmaParameters')) {
      window['doogmaParameters']['dp-' + this.param] = val;

      if (changeIn) {
        let params = {};
        params['dp-' + this.param] = this.value;
        let event = new CustomEvent('doogmaParametersChangeIn', {
          detail: { doogmaParameters: params },
        });
        document.dispatchEvent(event);
        //console.log(window["doogmaParameters"]);
      } else {
        window['doogmaParameters']['dp-' + this.param] = false;
      }
    }
  }; */
  listenDoogmaParametersChangeOut(event) {
    //console.log(event);
    if (event.detail.hasOwnProperty('doogmaParameters')) {
      if (event.detail.doogmaParameters.hasOwnProperty('dp-' + this.param)) {
        let val = event.detail.doogmaParameters['dp-' + this.param];
        if (this.value === val) {
          this.select(false);
        }
      }
    }
  }
  render() {
    return (h(Host, { class: this.classes.join(' '), style: { marginRight: this.gap + 'rem', marginBottom: this.gap + 'rem' } }, h("span", { onClick: ev => this.fontSwatchSelectedHandler(ev), "data-font": this.value, title: this.name, style: {
        width: this.size + 'px',
        height: this.size + 'px',
        backgroundColor: this.backColor,
        color: this.frontColor,
        display: 'flex',
      } }, this.label)));
  }
  static get watchers() { return {
    "isActive": ["watchisActiveHandler"],
    "circular": ["watchCircular"]
  }; }
};

export { DoogmaFontSwatch as doogma_font_swatch };
