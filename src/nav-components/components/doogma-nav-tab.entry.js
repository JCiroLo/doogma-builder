import { r as registerInstance, h } from './index-55235861.js';

const DoogmaNavTab = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = 'Tab Name';
    this.param = 'natabs';
    this.index = '0';
    this.slug = 'tabname';
    this.selected = 'no'; // yes,no
    this.isActive = false;
  }
  componentWillLoad() {
    if (this.selected === 'yes') {
    }
  }
  componentDidLoad() {
    document.dispatchEvent(new CustomEvent('doogmaNavTabRendered', {
      detail: {
        param: this.param,
        index: this.index,
      },
    }));
    document.dispatchEvent(new CustomEvent('doogmaNavNestedElmRendered', {
      detail: {
        param: this.param,
        index: this.index,
      },
    }));
  }
  render() {
    return (h("div", { "data-slug": this.slug, class: "doogma-nav-tab-content-inner doogma-nav-nested-content-inner" }, "This is ", this.name, " Content"));
  }
};

export { DoogmaNavTab as doogma_nav_tab };
