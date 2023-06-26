import { r as registerInstance, h, e as Host } from './index-55235861.js';

const DoogmaImageSwatch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'imageswatch1';
    this.name = 'Image';
    this.value = '';
    this.src = 'https://via.placeholder.com/150/0000FF/';
    this.size = '32'; // could be 24,28,64,75 etc
    this.circular = 'no'; // true for circular swatches
    this.gap = '.5'; // rem
    this.selected = 'no'; // yes,no
    this.label = '';
    this.isActive = false;
    this.classes = ['image-swatch', 'doogma-control-item', 'doogma-swatch-list--item'];
    this.select = (changeIn = true) => {
      this.isActive = true;
      document.dispatchEvent(new CustomEvent('doogmaImageSwatchComponentUpdated', {
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
    this.imageSwatchSelectedHandler = (event) => {
      event.preventDefault();
      //var elm = (event.target as HTMLElement);
      //console.log(elm.parentNode.parentNode,this.value);
      this.select();
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
  listenDoogmaColorSwatchComponentUpdated(ev) {
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
          this.select(false);
        }
      }
    }
  }
  render() {
    return (h(Host, { class: `${this.classes.join(' ')}`, style: { marginRight: this.gap + 'rem', marginBottom: this.gap + 'rem' } }, h("span", { onClick: ev => this.imageSwatchSelectedHandler(ev), style: {
        width: this.size + 'px',
        height: this.size + 'px',
        display: 'flex',
        margin: 'auto',
      } }, h("img", { src: this.src, style: { width: '100%' } })), this.label && h("label", null, this.label)));
  }
  static get watchers() { return {
    "isActive": ["watchisActiveHandler"],
    "circular": ["watchCircular"]
  }; }
};

export { DoogmaImageSwatch as doogma_image_swatch };
