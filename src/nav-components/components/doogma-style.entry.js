import { r as registerInstance } from './index-55235861.js';

const doogmaCustomScripts = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.internal = '';
    this.external = '';
  }
  componentWillLoad() {
    if (this.internal !== '') {
      const styleEl = document.createElement('style');
      document.head.appendChild(styleEl);
      styleEl.textContent = this.internal;
    }
    if (this.external !== '') {
      const linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.setAttribute('href', this.external);
      document.head.appendChild(linkEl);
    }
  }
};

export { doogmaCustomScripts as doogma_style };
