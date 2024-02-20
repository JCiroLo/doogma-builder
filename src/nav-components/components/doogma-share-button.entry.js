import { r as registerInstance, h } from './index-55235861.js';

const doogmaShareButtonCss = ".doogma-share-button{cursor:pointer;padding:0.25rem;display:flex;align-items:center;justify-content:center;gap:0.25rem;background:transparent;border:1px solid black}.doogma-share-button--shape-default{border-radius:0}.doogma-share-button--shape-circular{border-radius:50%}.doogma-share-button--shape-rounded{border-radius:4px}.doogma-share-button-modal-container{position:relative}.doogma-share-button-modal-wrapper{display:flex;flex-direction:column;padding:2rem 3rem 1rem 3rem;gap:1rem;position:absolute;width:308px;height:160px;background:#FFFFFF;border:1px solid #C7C7C7;box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25)}.doogma-share-button-modal-close-button{margin-left:auto;background:transparent;cursor:pointer;padding:0.5rem;border-width:0;position:absolute;top:0;right:0}.doogma-share-button-modal-header{text-align:center;font-style:normal;font-weight:700;font-size:15px;line-height:18px}.doogma-share-button-modal-input{width:228px;height:33px;color:#505050;text-overflow:ellipsis}.doogma-share-button-modal-copy-button{cursor:pointer;padding:0.25rem 1rem;width:fit-content;align-self:center;background:black;color:white}";

// Default ICON if the user dot asign one
const defaultSvgIconShareButton = "<svg width='24' height='24' viewBox='-4 -4 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'> <path d='M6.91933 9.07474L3.9385 7.44899C3.65237 7.73302 3.28855 7.92597 2.89292 8.00353C2.49729 8.08108 2.08755 8.03977 1.71537 7.8848C1.34318 7.72983 1.02521 7.46814 0.801532 7.13271C0.577857 6.79729 0.458496 6.40315 0.458496 5.99999C0.458496 5.59683 0.577857 5.2027 0.801532 4.86727C1.02521 4.53185 1.34318 4.27016 1.71537 4.11519C2.08755 3.96021 2.49729 3.9189 2.89292 3.99646C3.28855 4.07402 3.65237 4.26697 3.9385 4.55099L6.91933 2.92524C6.8171 2.44559 6.89093 1.94516 7.12734 1.51547C7.36375 1.08579 7.74693 0.755553 8.2068 0.585163C8.66668 0.414772 9.17252 0.415611 9.63183 0.587527C10.0911 0.759442 10.4732 1.09095 10.7082 1.52142C10.9432 1.95188 11.0154 2.45255 10.9115 2.93187C10.8077 3.41118 10.5348 3.8371 10.1428 4.13175C9.75073 4.4264 9.26572 4.57008 8.77644 4.53652C8.28716 4.50297 7.82631 4.29441 7.47816 3.94899L4.49733 5.57474C4.55679 5.85513 4.55679 6.14486 4.49733 6.42524L7.47816 8.05099C7.82631 7.70558 8.28716 7.49702 8.77644 7.46346C9.26572 7.4299 9.75073 7.57359 10.1428 7.86823C10.5348 8.16288 10.8077 8.58881 10.9115 9.06812C11.0154 9.54743 10.9432 10.0481 10.7082 10.4786C10.4732 10.909 10.0911 11.2405 9.63183 11.4125C9.17252 11.5844 8.66668 11.5852 8.2068 11.4148C7.74693 11.2444 7.36375 10.9142 7.12734 10.4845C6.89093 10.0548 6.8171 9.5544 6.91933 9.07474Z' fill='black'/></svg>";
const DoogmaShareButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // LABEL CONTAINER
    this.label = 'My Share Button';
    this.hideLabel = 'no'; // yes,no
    // SHARE BUTTON
    this.labelShareButton = 'Share';
    this.shapeShareButton = 'default'; // default, rounded or circular
    this.iconShareButton = defaultSvgIconShareButton; // svg icon as a string between ''
    // MODAL
    // Close Button
    this.iconCloseModal = "X"; // svg icon as a string between ''
    // Header
    this.labelHeaderModal = 'Link to your saved design';
    // Button Copy
    this.labelButtonCta = 'Copy URL';
    this.labelButtonCtaTimeOut = 3000;
    // STATES
    this.classes = [
      'doogma-nav-component-container',
      'doogma-share-button-container'
    ];
    this.buttonClasses = [
      'doogma-share-button',
    ];
    this.showModal = false;
    this.imgUrl = "No URL generated";
    // HANDLERS
    this.handleCloseModal = () => {
      this.showModal = false;
    };
    // Open modal and gets the URL from doogma object
    this.handleOpenModal = () => {
      event.preventDefault();
      const getURL = (url) => {
        this.imgUrl = url;
        this.showModal = true;
      };
      if (window.hasOwnProperty('doogma')) {
        window['doogma'].saveDesign({
          success: response => {
            const { url } = response;
            getURL(url);
          },
          error: response => {
            console.log('Error: ', response);
          }
        });
      }
      else {
        this.imgUrl = 'No URL generated';
        this.showModal = true;
      }
    };
    // Copy the URL fron Input
    this.handleCopyButton = () => {
      navigator.clipboard.writeText(this.imgUrl);
      if (this.labelButtonCtaClicked) {
        const initialLabel = this.labelButtonCta;
        this.labelButtonCta = this.labelButtonCtaClicked;
        setTimeout(() => {
          this.labelButtonCta = initialLabel;
        }, this.labelButtonCtaTimeOut);
      }
    };
  }
  //LISTENERS
  // If user click outside modal this will be closed
  handleBodyClick(event) {
    if (this.modalRef && event.target !== this.modalRef && !this.modalRef.contains(event.target)) {
      this.showModal = false;
    }
  }
  //LIFECYCLES
  componentWillLoad() {
    if (this.buttonClasses.length > 0 && this.shapeShareButton) {
      // Create a shape className to the border-radius of button
      let shapeClass = `${this.buttonClasses[0]}--shape-${this.shapeShareButton}`;
      this.buttonClasses.push(shapeClass);
    }
  }
  render() {
    return (h("div", { class: this.classes.join(' ') }, this.hideLabel === 'no' ? h("label", null, this.label) : '', h("button", { class: this.buttonClasses.join(' '), onClick: () => this.handleOpenModal(), innerHTML: this.iconShareButton }, this.shapeShareButton === "circular"
      // Comparation needed because by default the button has a text-label, but the icon share button don't have to have a text-label
      ? null
      : this.labelShareButton), h("div", { class: "doogma-share-button-modal-container" }, this.showModal && (h("div", { class: "doogma-share-button-modal-wrapper", ref: (el) => (this.modalRef = el) }, h("button", { class: "doogma-share-button-modal-close-button", onClick: () => this.handleCloseModal(), innerHTML: this.iconCloseModal }), h("div", { class: "doogma-share-button-modal-header" }, this.labelHeaderModal), h("input", { class: "doogma-share-button-modal-input", type: "text", disabled: true, value: this.imgUrl }), h("button", { class: "doogma-share-button-modal-copy-button", onClick: this.handleCopyButton }, this.labelButtonCta))))));
  }
};
DoogmaShareButton.style = doogmaShareButtonCss;

export { DoogmaShareButton as doogma_share_button };
