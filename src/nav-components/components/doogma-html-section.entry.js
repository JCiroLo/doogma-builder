import { r as registerInstance, h } from './index-55235861.js';

const doogmaHtmlSection = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.content = '<div></div>';
    this.class = '';
  }
  componentDidLoad() {
    this.class = `doogma-html-section ${this.class}`;
  }
  render() {
    return h("div", { class: this.class, innerHTML: this.content });
  }
};

export { doogmaHtmlSection as doogma_html_section };
