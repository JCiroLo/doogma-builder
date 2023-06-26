import { r as registerInstance, h } from './index-55235861.js';

const doogmaDownloadButtonCss = ".doogma-download-button{cursor:pointer;padding:0.25rem;display:flex;align-items:center;justify-content:center;gap:0.25rem;background:transparent;border:1px solid black;transition:background-color 0.2s ease-out, color 0.2s ease-out}.doogma-download-button:hover{background-color:#d0d0d0}.doogma-download-button:active{background-color:#000000;color:white}.doogma-download-button:active svg path{stroke:white;fill:white}.doogma-download-button--shape-default{border-radius:0}.doogma-download-button--shape-circular{border-radius:50%;padding:calc(1em - 0.25rem)}.doogma-download-button--shape-rounded{border-radius:4px}.doogma-download-button svg{height:12px;width:12px}.doogma-download-button svg path{stroke:black;fill:black;transition:stroke 0.2s ease-out}";

// Default ICON if the user dot asign one
const defaultSvgIconDownloadButton = '<svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><path d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></g></svg>';
const DoogmaDownloadButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // LABEL CONTAINER
    this.label = 'My Download Button';
    this.hideLabel = 'no'; // yes,no
    // DOWNLOAD BUTTON
    this.labelDownloadButton = 'Download';
    this.shapeDownloadButton = 'default'; // default, rounded or circular
    this.iconDownloadButton = defaultSvgIconDownloadButton; // svg icon as a string between ''
    // STATES
    this.classes = [
      'doogma-nav-component-container',
      'doogma-download-button-container',
    ];
    this.buttonClasses = ['doogma-download-button'];
    this.downloadUrl = 'No URL generated';
    // Copy the URL fron Input
    this.handleCopyButton = () => {
      if (window.hasOwnProperty('doogma')) {
        window['doogma'].saveDesign({
          waitForImageComplete: true,
          success: response => {
            const { doogmaSnapshotImage } = response;
            this.downloadUrl = doogmaSnapshotImage;
            window.open(doogmaSnapshotImage, '_self');
          },
          error: response => {
            console.log('Error: ', response);
          },
        });
      }
    };
  }
  //LISTENERS
  //LIFECYCLES
  componentWillLoad() {
    if (this.buttonClasses.length > 0 && this.shapeDownloadButton) {
      // Create a shape className to the border-radius of button
      let shapeClass = `${this.buttonClasses[0]}--shape-${this.shapeDownloadButton}`;
      this.buttonClasses.push(shapeClass);
    }
  }
  render() {
    return (h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? h("label", null, this.label) : '', h("button", { class: this.buttonClasses.join(' '), onClick: () => this.handleCopyButton(), innerHTML: this.iconDownloadButton }, this.shapeDownloadButton === 'circular'
      ? // Comparation needed because by default the button has a text-label, but the icon download button don't have to have a text-label
        null
      : this.labelDownloadButton)));
  }
};
DoogmaDownloadButton.style = doogmaDownloadButtonCss;

export { DoogmaDownloadButton as doogma_download_button };
