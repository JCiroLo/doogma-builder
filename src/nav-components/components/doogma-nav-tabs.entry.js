import { r as registerInstance, h } from './index-55235861.js';

const doogmaNavTabsCss = ".doogma-nav-tabs-container.is-accordion .doogma-nav-tabs{display:none}.doogma-nav-tabs-container.is-accordion .doogma-nav-tabs-content .doogma-accordion-button{display:block}.doogma-nav-tabs-container.tabs-hidden .doogma-nav-tabs{display:none !important}.doogma-nav-tabs-container.tabs-hidden .doogma-nav-tabs-content .doogma-accordion-button{display:none !important}.doogma-nav-tabs{display:none;list-style:none;margin:0;padding:0;width:100%;border-bottom:1px solid #000}.doogma-nav-tabs li{display:flex;margin-right:0.25rem}.doogma-nav-tabs li a{padding:1rem 1.5rem;background:#eee;color:#000;text-decoration:none}.doogma-nav-tabs li.active a{color:#fff;background:#000}.doogma-nav-tabs-content .doogma-nav-tab-content-wrapper{display:block;width:100%}.doogma-nav-tabs-content .doogma-nav-tab-content{display:none;padding:1.5rem 0}.doogma-nav-tabs-content .doogma-nav-tab-content.active{display:block}.doogma-nav-tabs-content .doogma-accordion-button{display:block;padding:1rem 1.5rem;margin-bottom:0.25rem;background:#eee;color:#000;text-decoration:none;text-transform:uppercase}.doogma-nav-tabs-content .doogma-accordion-button.active{background:#000;color:#fff}@media all{.doogma-nav-tabs{display:flex}.doogma-nav-tabs-content .doogma-accordion-button{display:none}}";

const DoogmaNavTabs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'navtabs';
    this.viewType = 'tab'; // tab or accordion
    this.maxWidth = '100%'; //
    this.hideTabs = 'no'; //no,yes
    this.enableZoom = 'no'; //no,yes
    this.class = '';
    this.classes = ['doogma-nav-component-container', 'doogma-nav-tabs-container'];
    this.zoomInputs = {};
    this.slugify = str => {
      let new_str = str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      //console.log(new_str);
      return new_str;
    };
    this.getTabsContainerId = () => {
      return 'doogma-nav-tabs-container-' + this.param;
    };
    this.getTabId = (name, index) => {
      return 'doogma-nav-tab-' + this.param + '-' + this.slugify(name) + index;
    };
    this.getTabContentId = (name, index) => {
      return 'doogma-nav-tab-content-' + this.param + '-' + this.slugify(name) + index;
    };
    this.select = ev => {
      let elm, target, parent, tabId;
      let ref = ev.target.dataset.ref;
      if (ev.target.tagName == 'A') {
        let ref = ev.target.dataset.ref;
        if (ref === 'list-item') {
          elm = ev.target.parentNode;
          parent = ev.target.parentNode.parentNode.parentNode;
          tabId = elm.getAttribute('id');
        }
        else {
          elm = ev.target;
          parent = ev.target.parentNode.parentNode.parentNode;
          tabId = elm.dataset.tab;
        }
      }
      else if (ev.target.dataset.ref == undefined) {
        let tabEl = ev.target.closest('a');
        let ref = tabEl.dataset.ref;
        if (ref === 'list-item') {
          elm = tabEl.parentNode;
          parent = tabEl.parentNode.parentNode.parentNode;
          tabId = elm.getAttribute('id');
        }
      }
      /*
  else if (ev.target.tagName == 'IMG' || ev.target.tagName == 'svg') {
        let ref = ev.target.parentNode.dataset.ref;
        if (ref === 'list-item') {
          elm = ev.target.parentNode.parentNode as HTMLAnchorElement;
          parent = ev.target.parentNode.parentNode.parentNode.parentNode;
          tabId = elm.getAttribute('id');
        } else {
          elm = ev.target as HTMLElement;
          parent = ev.target.parentNode.parentNode.parentNode.parentNode;
          tabId = elm.dataset.tab;
        }
      }
      */
      //console.log(tabId);
      target = elm.dataset.target;
      let li = parent.querySelector("li[id='" + tabId + "']");
      let accordionButton = parent.querySelector("a.doogma-accordion-button[data-tab='" + tabId + "']");
      //remove active from all tabs
      //let parentUl = ev.target.parentNode.parentNode;
      parent.querySelectorAll('.doogma-nav-tabs > li').forEach(function (elm) {
        elm.classList.remove('active');
      });
      parent
        .querySelectorAll('.doogma-nav-tabs-content > .doogma-nav-tab-content-wrapper > a.doogma-accordion-button[data-tab]')
        .forEach(function (el) {
        // console.log(el);
        el.classList.remove('active');
      });
      if (!elm.classList.contains('active')) {
        elm.classList.add('active');
      }
      if (ref !== 'list-item') {
        //console.log(ref,li);
        li.classList.add('active');
        //parent.querySelector("li[id='"+tabId+"']");
      }
      else {
        accordionButton.classList.add('active');
      }
      //content
      let contents = parent.querySelector('.doogma-nav-tabs-content');
      //console.log(contents);
      contents.querySelectorAll('.doogma-nav-tab-content').forEach(function (elm) {
        elm.classList.remove('active');
      });
      let doogmaNavTabContent = contents.querySelector(".doogma-nav-tab-content[id='" + target + "']");
      doogmaNavTabContent.classList.add('active');
      if (this.enableZoom === 'yes') {
        //console.log(elm);
        let x = elm.getAttribute('data-zoom-x');
        let y = elm.getAttribute('data-zoom-y');
        let width = elm.getAttribute('data-zoom-width');
        let height = elm.getAttribute('data-zoom-height');
        this.navigateZoom(x, y, width, height);
      }
    };
    this.dispatchZoomEvent = (elem, type) => {
      let evt = document.createEvent('Event');
      evt.initEvent(type, true, false);
      elem.dispatchEvent(evt);
    };
    this.onClickNavTab = ev => {
      this.select(ev);
    };
  }
  componentWillLoad() {
    if (this.class.length > 0) {
      let classes = this.class.split(' ');
      this.classes = this.classes.concat(classes);
    }
    if (this.viewType === 'accordion') {
      this.classes.push('is-accordion');
    }
    if (this.hideTabs === 'yes') {
      this.classes.push('tabs-hidden');
    }
    this.itemsArray = JSON.parse(this.items);
  }
  componentDidLoad() {
    document.dispatchEvent(new CustomEvent('doogmaNavTabsRendered', { detail: { param: this.param } }));
    this.zoomInputs['zoomX'] = document.querySelector('.doogma-view-x');
    this.zoomInputs['zoomY'] = document.querySelector('.doogma-view-y');
    this.zoomInputs['zoomWidth'] = document.querySelector('.doogma-view-width');
    this.zoomInputs['zoomHeight'] = document.querySelector('.doogma-view-height');
    let that = this;
    if (this.enableZoom === 'yes') {
      this.itemsArray.forEach(function (item) {
        if (item['selected'] !== undefined && item['selected'] === 'yes') {
          let x = item['zoomX'] !== undefined && item['zoomX'] !== '' ? item['zoomX'] : '';
          let y = item['zoomY'] !== undefined && item['zoomY'] !== '' ? item['zoomY'] : '';
          let width = item['zoomWidth'] !== undefined && item['zoomWidth'] !== '' ? item['zoomWidth'] : '';
          let height = item['zoomHeight'] !== undefined && item['zoomHeight'] !== '' ? item['zoomHeight'] : '';
          that.navigateZoom(x, y, width, height);
        }
      });
    }
  }
  navigateZoom(x, y, width, height) {
    if (this.zoomInputs['zoomX'] !== undefined) {
      this.zoomInputs['zoomX'].value = x;
      this.zoomInputs['zoomY'].value = y;
      this.zoomInputs['zoomWidth'].value = width;
      this.zoomInputs['zoomHeight'].value = height;
      for (let x in this.zoomInputs) {
        this.dispatchZoomEvent(this.zoomInputs[x], 'change');
        //console.log(x,this.zoomInputs[x])
      }
    }
    if (window.hasOwnProperty('doogmaParameters')) {
      if (typeof window['doogmaParameters'] !== undefined) {
        window['doogmaParameters']['dp-zoom-x'] = parseInt(x);
        window['doogmaParameters']['dp-zoom-y'] = parseInt(y);
        window['doogmaParameters']['dp-zoom-width'] = parseInt(width);
        window['doogmaParameters']['dp-zoom-height'] = parseInt(height);
      }
      //do nothing for now
      let params = {};
      params['dp-zoom-x'] = parseInt(x);
      params['dp-zoom-y'] = parseInt(y);
      params['dp-zoom-width'] = parseInt(width);
      params['dp-zoom-height'] = parseInt(height);
      //console.log(params);
      let event = new CustomEvent('doogmaParametersChangeIn', {
        detail: { doogmaParameters: params },
      });
      document.dispatchEvent(event);
    }
  }
  render() {
    return (h("div", { id: this.getTabsContainerId(), class: this.classes.join(' '), style: { maxWidth: this.maxWidth, margin: '0 auto' } }, h("ul", { class: "doogma-nav-tabs" }, this.itemsArray.map((item, index) => (h("li", { id: this.getTabId(item['name'], index), "data-target": this.getTabContentId(item['name'], index), class: item['selected'] !== undefined && item['selected'] === 'yes' ? 'active' : '', "data-zoom-x": item['zoomX'] !== undefined && item['zoomX'] !== '' ? item['zoomX'] : '', "data-zoom-y": item['zoomY'] !== undefined && item['zoomY'] !== '' ? item['zoomY'] : '', "data-zoom-width": item['zoomWidth'] !== undefined && item['zoomWidth'] !== '' ? item['zoomWidth'] : '', "data-zoom-height": item['zoomHeight'] !== undefined && item['zoomHeight'] !== ''
        ? item['zoomHeight']
        : '' }, h("a", { href: "javascript:void(0)", onClick: ev => this.onClickNavTab(ev), "data-ref": "list-item", "data-tab": this.getTabId(item['name'], index), "data-nav-tab": this.param + index, innerHTML: item['svg'] }, item['image'] && h("img", { src: item['image'] }), !item['underText'] && item['name']), item['underText'] && h("span", null, item['underText']))))), h("div", { class: "doogma-nav-tabs-content" }, this.itemsArray.map((item, index) => (h("div", { class: "doogma-nav-tab-content-wrapper" }, h("a", { href: "javascript:void(0)", onClick: ev => this.onClickNavTab(ev), class: item['selected'] !== undefined && item['selected'] === 'yes'
        ? 'doogma-accordion-button active'
        : 'doogma-accordion-button', "data-ref": "accordion-button", "data-target": this.getTabContentId(item['name'], index), "data-tab": this.getTabId(item['name'], index), "data-zoom-x": item['zoomX'] !== undefined && item['zoomX'] !== '' ? item['zoomX'] : '', "data-zoom-y": item['zoomY'] !== undefined && item['zoomY'] !== '' ? item['zoomY'] : '', "data-zoom-width": item['zoomWidth'] !== undefined && item['zoomWidth'] !== ''
        ? item['zoomWidth']
        : '', "data-zoom-height": item['zoomHeight'] !== undefined && item['zoomHeight'] !== ''
        ? item['zoomHeight']
        : '' }, item['name']), h("div", { id: this.getTabContentId(item['name'], index), "data-nav-tab-content": this.param + index, class: item['selected'] !== undefined && item['selected'] === 'yes'
        ? 'doogma-nav-tab-content active'
        : 'doogma-nav-tab-content' }, h("doogma-nav-tab", { param: this.param, index: index.toString(), slug: this.getTabContentId(item['name'], index), "data-index": index, "data-param": this.param, "data-nested-content": this.param + index, name: item['name'], image: item['image'] }))))))));
  }
};
DoogmaNavTabs.style = doogmaNavTabsCss;

export { DoogmaNavTabs as doogma_nav_tabs };
