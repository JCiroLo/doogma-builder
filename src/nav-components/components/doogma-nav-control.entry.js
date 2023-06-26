import { r as registerInstance, h, e as Host } from './index-55235861.js';

const DoogmaNavControl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'control';
    this.label = 'View 1';
    this.zoomX = '';
    this.zoomY = '';
    this.zoomHeight = '750';
    this.zoomWidth = '750';
    this.viewType = 'button'; // tab
    this.controlsNav = ''; // id of section , tab to be controlled
    this.class = '';
    this.controlId = '';
    this.selected = 'no'; // yes,no
    this.isActive = false;
    this.classes = ['doogma-nav-control'];
    this.zoomInputs = {};
    this.select = (changeIn = true) => {
      this.isActive = true;
      document.dispatchEvent(new CustomEvent('doogmaNavControlComponentUpdated', {
        detail: {
          param: this.param,
          controlId: this.controlId,
        },
      }));
      this.zoomInputs['zoomX'].value = this.zoomX;
      this.zoomInputs['zoomY'].value = this.zoomY;
      this.zoomInputs['zoomWidth'].value = this.zoomWidth;
      this.zoomInputs['zoomHeight'].value = this.zoomHeight;
      for (let x in this.zoomInputs) {
        this.dispatchZoomEvent(this.zoomInputs[x], 'change');
        //console.log(x,this.zoomInputs[x])
      }
      if (window.hasOwnProperty('doogmaParameters')) {
        if (typeof window['doogmaParameters'] !== undefined) {
          window['doogmaParameters']['dp-x'] = parseInt(this.zoomX);
          window['doogmaParameters']['dp-y'] = parseInt(this.zoomY);
          window['doogmaParameters']['dp-width'] = parseInt(this.zoomWidth);
          window['doogmaParameters']['dp-height'] = parseInt(this.zoomHeight);
        }
        if (changeIn) {
          //do nothing for now
          let params = {};
          params['dp-x'] = parseInt(this.zoomX);
          params['dp-y'] = parseInt(this.zoomY);
          params['dp-width'] = parseInt(this.zoomWidth);
          params['dp-height'] = parseInt(this.zoomHeight);
          let event = new CustomEvent('doogmaParametersChangeIn', {
            detail: { doogmaParameters: params },
          });
          document.dispatchEvent(event);
        }
      }
      if (this.controlsNav !== '') {
        let ev = new Event('click');
        //console.log(this.controlsNav);
        document.querySelector("a[data-nav-tab='" + this.controlsNav + "']").dispatchEvent(ev);
      }
    };
    this.onClickNavButton = (event) => {
      event.preventDefault();
      this.select();
    };
    this.dispatchZoomEvent = (elem, type) => {
      let evt = document.createEvent('Event');
      evt.initEvent(type, true, false);
      elem.dispatchEvent(evt);
    };
  }
  componentWillLoad() {
    if (this.class.length > 0) {
      let classes = this.class.split(' ');
      this.classes = this.classes.concat(classes);
    }
  }
  componentDidLoad() {
    this.zoomInputs['zoomX'] = document.querySelector('.doogma-view-x');
    this.zoomInputs['zoomY'] = document.querySelector('.doogma-view-y');
    this.zoomInputs['zoomWidth'] = document.querySelector('.doogma-view-width');
    this.zoomInputs['zoomHeight'] = document.querySelector('.doogma-view-height');
    if (this.selected === 'yes') {
      //console.log(this.param,this.selected);
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
  listenDoogmaNavControlComponentUpdated(ev) {
    //console.log(ev);
    if (this.param === ev.detail.param && this.controlId !== ev.detail.controlId) {
      this.isActive = false;
    }
  }
  render() {
    return (h(Host, { id: this.controlId }, h("div", { class: this.classes.join(' ') }, h("button", { type: "button", onClick: ev => this.onClickNavButton(ev) }, this.label))));
  }
  static get watchers() { return {
    "isActive": ["watchisActiveHandler"]
  }; }
};

export { DoogmaNavControl as doogma_nav_control };
