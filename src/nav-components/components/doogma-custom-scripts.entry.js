import { r as registerInstance } from './index-55235861.js';

const doogmaCustomScripts = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'custom default scripts label';
  }
  componentDidLoad() {
    const scriptsSources = JSON.parse(this.items);
    scriptsSources.map((src) => {
      fetch(src['source'])
        .then(res => {
        if (res.status === 200) {
          let scriptEl = document.createElement('script');
          scriptEl.setAttribute('src', src['source']);
          scriptEl.setAttribute('type', 'module');
          //scriptEl.noModule = true;
          document.body.appendChild(scriptEl);
        }
      })
        .catch(error => console.log('error', error));
    });
  }
};

export { doogmaCustomScripts as doogma_custom_scripts };
