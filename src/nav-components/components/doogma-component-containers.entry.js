import { r as registerInstance, h } from './index-55235861.js';

const doogmaComponentContainersCss = "";

const DoogmaComponentContainers = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.param = 'component-containers';
    this.class = '';
    this.classes = ['doogma-component-containers'];
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
      return 'doogma-containers-' + this.param;
    };
    this.getTabId = (name, index) => {
      return 'doogma-container-' + this.param + '-' + this.slugify(name) + index;
    };
    this.getContainerContentId = (name, index) => {
      return 'doogma-container-content-' + this.param + '-' + this.slugify(name) + index;
    };
  }
  componentWillLoad() {
    if (this.class.length > 0) {
      let classes = this.class.split(' ');
      this.classes = this.classes.concat(classes);
    }
    this.itemsArray = JSON.parse(this.items);
  }
  componentDidLoad() {
    document.dispatchEvent(new CustomEvent('doogmaContainerRendered', { detail: { param: this.param } }));
    /*  document.dispatchEvent(
      new CustomEvent('doogmaNavTabsRendered', { detail: { param: this.param } }),
    );
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
          let width =
            item['zoomWidth'] !== undefined && item['zoomWidth'] !== '' ? item['zoomWidth'] : '';
          let height =
            item['zoomHeight'] !== undefined && item['zoomHeight'] !== '' ? item['zoomHeight'] : '';
          that.navigateZoom(x, y, width, height);
        }
      });
    } */
  }
  /*
  select = ev => {
    let elm, target, parent, tabId;
    let ref = ev.target.dataset.ref;
    if (ev.target.tagName == 'A') {
      let ref = ev.target.dataset.ref;
      if (ref === 'list-item') {
        elm = ev.target.parentNode as HTMLAnchorElement;
        parent = ev.target.parentNode.parentNode.parentNode;
        tabId = elm.getAttribute('id');
      } else {
        elm = ev.target as HTMLElement;
        parent = ev.target.parentNode.parentNode.parentNode;
        tabId = elm.dataset.tab;
      }
    } else if (ev.target.tagName == 'IMG') {
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

    //console.log(tabId);
    target = elm.dataset.target;
    let li = parent.querySelector("li[id='" + tabId + "']");
    let accordionButton = parent.querySelector(
      "a.doogma-accordion-button[data-tab='" + tabId + "']",
    );
    //remove active from all tabs
    //let parentUl = ev.target.parentNode.parentNode;
    parent.querySelectorAll('.doogma-containers > li').forEach(function (elm) {
      elm.classList.remove('active');
    });

    parent
      .querySelectorAll(
        '.doogma-containers-content > .doogma-container-content-wrapper > a.doogma-accordion-button[data-tab]',
      )
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
    } else {
      accordionButton.classList.add('active');
    }

    //content
    let contents = parent.querySelector('.doogma-containers-content');
    //console.log(contents);
    contents.querySelectorAll('.doogma-container-content').forEach(function (elm) {
      elm.classList.remove('active');
    });
    let doogmaNavTabContent = contents.querySelector(
      ".doogma-container-content[id='" + target + "']",
    );
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
 */
  /*
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
  } */
  /* dispatchZoomEvent = (elem, type) => {
    let evt = document.createEvent('Event');
    evt.initEvent(type, true, false);
    elem.dispatchEvent(evt);
  };

  onClickNavTab = ev => {
    this.select(ev);
  };
*/
  render() {
    return (
    /*  <div
      id={this.getTabsContainerId()}
      class={this.classes.join(' ')}
      style={{ maxWidth: this.maxWidth, margin: '0 auto' }}
    >
      <div class="doogma-containers-content">
        {this.itemsArray.map((item: Object, index) => (
          <div class="doogma-container-content-wrapper">
            <div
              id={this.getContainerContentId(item['name'], index)}
              data-container-content={this.param + index}
              class={
                item['selected'] !== undefined && item['selected'] === 'yes'
                  ? 'doogma-container-content active'
                  : 'doogma-container-content'
              }
            >
              <doogma-container
                param={this.param}
                index={index.toString()}
                slug={this.getContainerContentId(item['name'], index)}
                data-index={index}
                data-param={this.param}
                data-nested-content={this.param + index}
                name={item['name']}
                image={item['image']}
              ></doogma-container>
            </div>
          </div>
        ))}
      </div>
    </div> */
    h("div", { class: this.classes.join(' ') }, this.itemsArray.map((item, index) => (h("div", { id: this.getContainerContentId(item['name'], index), "data-container-content": this.param + index }, h("doogma-component-container", { param: this.param, index: index.toString(), slug: this.getContainerContentId(item['name'], index), "data-index": index, "data-param": this.param, "data-nested-content": this.param + index, name: item['name'], image: item['image'] }))))));
  }
};
DoogmaComponentContainers.style = doogmaComponentContainersCss;

export { DoogmaComponentContainers as doogma_component_containers };
