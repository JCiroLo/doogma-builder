import { r as registerInstance, h } from './index-55235861.js';

const doogmaWrapperCss = "doogma-wrapper{width:100%;padding:2rem 0}.doogma-sticky{position:sticky;top:0}.doogma-wrapper{margin:0 auto;max-width:100%}.doogma-wrapper .doogma-wrapper-row{display:flex;align-items:start;justify-content:center}.doogma-wrapper .doogma-col-1,.doogma-wrapper .doogma-col-2{width:50%}.doogma-wrapper .doogma-vis-wrapper{display:block;text-align:right}";

const DoogmaWrapper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.visId = '';
    this.initConfig = '';
    this.maxWidth = '1200px';
    this.ratio = '50:50';
    this.ratios = 'mobile=100:100|tablet=40:60|desktop=50:50';
    this.gutter = '15px';
    this.topOffset = '0'; //used for sticky
    this.topOffsets = 'mobile=0px|tablet=80px|desktop=100px'; //used for sticky top offset
    this.class = '';
    this.classes = ['doogma-wrapper'];
    //@State() ratios : string[] ;
    this.ratiosObj = {
      mobile: ['100', '100'],
      tablet: ['60', '40'],
      desktop: ['50', '50'],
    };
    this.topOffsetsObj = {
      mobile: '90px',
      tablet: '90px',
      desktop: '100px',
    };
  }
  componentWillLoad() {
    if (this.class.length > 0) {
      let classes = this.class.split(' ');
      this.classes = this.classes.concat(classes);
    }
    //this.ratios = this.ratio.split(":");
    //setup ratios
    this._setupRatiosObj();
    //setup offset
    this._setupTopOffsetsObj();
    //console.log(this.ratiosObj);
    if (document.querySelectorAll("style[id='doogma-wrapper-styles']").length <= 0) {
      this.renderStyles();
    }
  }
  _setupRatiosObj() {
    let allowed_dimensions = ['mobile', 'tablet', 'desktop'];
    // console.log(allowed_dimensions);
    let allRatios = this.ratios.split('|');
    for (let x in allRatios) {
      //console.log(x,allRatios[x]);
      let deviceRatios = allRatios[x].split('=');
      //console.log(deviceRatios);
      if (allowed_dimensions.includes(deviceRatios[0])) {
        let ratios = deviceRatios[1].split(':');
        this.ratiosObj[deviceRatios[0]] = [ratios[0], ratios[1]];
        //console.log(ratios);
      }
    }
  }
  _setupTopOffsetsObj() {
    let allowed_dimensions = ['mobile', 'tablet', 'desktop'];
    let allOffsets = this.topOffsets.split('|');
    for (let x in allOffsets) {
      //console.log(x,allOffsets[x]);
      let topOffsets = allOffsets[x].split('=');
      if (allowed_dimensions.includes(topOffsets[0])) {
        //console.log(topOffsets);
        this.topOffsetsObj[topOffsets[0]] = topOffsets[1];
      }
    }
  }
  renderStyles() {
    let styles;
    styles = `
      .doogma-wrapper{
        padding : 0 ${this.gutter};
      }
      .doogma-wrapper .doogma-wrapper-row{
        flex-direction: column;
        margin-left:-${this.gutter};
        margin-right:-${this.gutter};
      }
      .doogma-wrapper .doogma-wrapper-row .doogma-col-1, .doogma-wrapper .doogma-wrapper-row .doogma-col-2{
          width:100%;
          padding-left:${this.gutter};
          padding-right:${this.gutter};
      }
      .doogma-wrapper .doogma-wrapper-row .doogma-col-1.doogma-sticky{
        top:${this.topOffsetsObj['mobile']}
       }
      @media screen and (max-width:767px){
        .doogma-wrapper .doogma-wrapper-row .doogma-col-1{
          width: ${this.ratiosObj['mobile'][0] + '%'};
        }
        .doogma-wrapper .doogma-wrapper-row .doogma-col-2{
          width: ${this.ratiosObj['mobile'][1] + '%'};
        }
        .doogma-wrapper .doogma-wrapper-row .doogma-col-1.doogma-sticky{
          top:${this.topOffsetsObj['mobile']}
        }
      }
      @media screen and (min-width:768px){
        .doogma-wrapper{

        }
        .doogma-wrapper .doogma-wrapper-row{
          flex-direction: row;
        }
        .doogma-wrapper .doogma-wrapper-row .doogma-col-1{
          width: ${this.ratiosObj['tablet'][0] + '%'};
        }
        .doogma-wrapper .doogma-wrapper-row .doogma-col-2{
          width: ${this.ratiosObj['tablet'][1] + '%'};
        }
        .doogma-wrapper .doogma-wrapper-row .doogma-col-1.doogma-sticky{
          top:${this.topOffsetsObj['tablet']}
        }
      }

       @media screen and (min-width:992px){
          .doogma-wrapper .doogma-wrapper-row .doogma-col-1{
            width: ${this.ratiosObj['desktop'][0] + '%'};
          }
          .doogma-wrapper .doogma-wrapper-row .doogma-col-2{
            width: ${this.ratiosObj['desktop'][1] + '%'};
          }
          .doogma-wrapper .doogma-wrapper-row .doogma-col-1.doogma-sticky{
            top:${this.topOffsetsObj['desktop']}
          }
       }
    `;
    let styleTag = document.createElement('style');
    styleTag.setAttribute('id', 'doogma-wrapper-styles');
    styleTag.innerHTML = styles;
    document.querySelector('head').appendChild(styleTag);
  }
  render() {
    //let initConfig = this.initConfig.length > 0 ? "data-initconfig='"+this.initConfig+"'" : "";
    return (h("div", { class: this.classes.join(' '), style: { maxWidth: this.maxWidth } }, h("div", { class: "doogma-wrapper-row" }, h("div", { class: "doogma-col-1 doogma-sticky" }, h("slot", { name: "vis" })), h("div", { class: "doogma-col-2", style: {} }, h("slot", { name: "nav" })))));
  }
};
DoogmaWrapper.style = doogmaWrapperCss;

export { DoogmaWrapper as doogma_wrapper };
