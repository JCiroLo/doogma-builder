import { r as registerInstance, h } from './index-55235861.js';

const DoogmaComponentContainer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = 'Container Name';
    this.param = 'component-container';
    this.index = '0';
    this.slug = 'container-name';
    this.isActive = false;
  }
  componentDidLoad() {
    document.dispatchEvent(new CustomEvent('doogmaContainerRendered', {
      detail: {
        param: this.param,
        index: this.index,
      },
    }));
    document.dispatchEvent(new CustomEvent('doogmaContainerNestedElmRendered', {
      detail: {
        param: this.param,
        index: this.index,
      },
    }));
  }
  render() {
    return (h("div", { "data-slug": this.slug, class: "doogma-container-content-inner doogma-container-nested-inner" }, "This is ", this.name, " Content"));
  }
};

export { DoogmaComponentContainer as doogma_component_container };
