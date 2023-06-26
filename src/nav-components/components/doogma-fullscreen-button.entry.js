import { r as registerInstance, h } from './index-55235861.js';

const doogmaFullscreenButtonCss = ".doogma-fullscreen-button{display:flex;cursor:pointer;padding:0.25rem;align-items:center;justify-content:center;background:white;border:1px solid black}.doogma-fullscreen-button--direction-left{margin-right:auto}.doogma-fullscreen-button--direction-right{margin-left:auto}.doogma-fullscreen-button--shape-default{border-radius:0}.doogma-fullscreen-button--shape-circular{border-radius:50%}.doogma-fullscreen-button--shape-rounded{border-radius:4px}.doogma-fullscreen-button-modal-container{position:fixed;top:0;left:0;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:rgba(0, 0, 0, 0.69)}.doogma-fullscreen-button-modal-wrapper{display:flex;flex-direction:column;max-width:100vw;height:100%}.doogma-fullscreen-button-modal-header{display:flex;justify-content:flex-end}.doogma-fullscreen-button-modal-header-close-button{cursor:pointer;padding:0.25rem;display:flex;align-items:center;justify-content:center;background:white;border:1px solid black;border-radius:4px}.doogma-fullscreen-button-modal-body{display:flex;flex-direction:column;height:100%}.doogma-fullscreen-button-modal-body canvas{aspect-ratio:5/4;background-color:white}";

// Default ICON if the user dot asign one
const defaultSvgIconFullscreenButton = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="20" height="20" /><g><path d="M7 2H2v5l1.8-1.8L6.5 8 8 6.5 5.2 3.8 7 2zm6 0l1.8 1.8L12 6.5 13.5 8l2.7-2.7L18 7V2h-5zm.5 10L12 13.5l2.7 2.7L13 18h5v-5l-1.8 1.8-2.7-2.8zm-7 0l-2.7 2.7L2 13v5h5l-1.8-1.8L8 13.5 6.5 12z" /></g></svg>';
const DoogmaFullscreenButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.shape = 'default';
    this.direction = 'right';
    this.icon = defaultSvgIconFullscreenButton;
    this.iconCloseModal = '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="20" height="20" /><g><path d="M3.4 2L2 3.4l2.8 2.8L3 8h5V3L6.2 4.8 3.4 2zm11.8 4.2L18 3.4 16.6 2l-2.8 2.8L12 3v5h5l-1.8-1.8zM4.8 13.8L2 16.6 3.4 18l2.8-2.8L8 17v-5H3l1.8 1.8zM17 12h-5v5l1.8-1.8 2.8 2.8 1.4-1.4-2.8-2.8L17 12z" /></g></svg>';
    // STATES
    this.classes = [
      'doogma-nav-component-container',
      'doogma-fullscreen-button-container',
    ];
    this.buttonClasses = ['doogma-fullscreen-button'];
    this.showModal = false;
    this.imgUrl = 'No URL generated';
    this.createModal = () => {
      this.modalId = `modal-${new Date().getTime()}`;
      const newCanvas = document.createElement('canvas');
      if (this.selector) {
        const selectorElement = document.querySelector(this.selector);
        if (selectorElement) {
          const currentCanvas = selectorElement.querySelector('canvas');
          if (currentCanvas) {
            const context = newCanvas.getContext('2d');
            newCanvas.width = currentCanvas.width;
            newCanvas.height = currentCanvas.height;
            context.drawImage(currentCanvas, 0, 0);
          }
          else {
            newCanvas.width = 700;
            newCanvas.height = 500;
          }
        }
      }
      const modalContainer = document.createElement('div');
      const modalWrapper = document.createElement('div');
      const modalHeader = document.createElement('div');
      const modalBody = document.createElement('div');
      const modalCloseButton = document.createElement('button');
      modalContainer.id = this.modalId;
      modalContainer.classList.add('doogma-fullscreen-button-modal-container');
      modalWrapper.classList.add('doogma-fullscreen-button-modal-wrapper');
      modalHeader.classList.add('doogma-fullscreen-button-modal-header');
      modalBody.classList.add('doogma-fullscreen-button-modal-body');
      modalCloseButton.classList.add('doogma-fullscreen-button-modal-header-close-button');
      modalCloseButton.innerHTML = this.iconCloseModal;
      modalCloseButton.onclick = () => this.handleCloseModal();
      modalHeader.appendChild(modalCloseButton);
      modalBody.appendChild(newCanvas);
      modalWrapper.appendChild(modalHeader);
      modalWrapper.appendChild(modalBody);
      modalContainer.appendChild(modalWrapper);
      /* const modal = (
        <div class="doogma-fullscreen-button-modal-container">
          <div class="doogma-fullscreen-button-modal-wrapper">
            <div class="doogma-fullscreen-button-modal-header">
              <button
                class="doogma-fullscreen-button-modal-header-close-button"
                onClick={() => this.handleCloseModal()}
                innerHTML={this.iconCloseModal}
              />
            </div>
            <div class="doogma-fullscreen-button-modal-body">
              <h1>Hola</h1>
            </div>
          </div>
        </div>
      ); */
      document.body.appendChild(modalContainer);
    };
    // HANDLERS
    this.handleOpenModal = () => {
      this.createModal();
    };
    this.handleCloseModal = () => {
      document.getElementById(this.modalId).remove();
    };
  }
  //LIFECYCLES
  componentWillLoad() {
    if (this.buttonClasses.length > 0 && this.direction) {
      this.buttonClasses.push(`${this.buttonClasses[0]}--direction-${this.direction}`);
    }
    if (this.buttonClasses.length > 0 && this.shape) {
      this.buttonClasses.push(`${this.buttonClasses[0]}--shape-${this.shape}`);
    }
  }
  render() {
    return (h("div", { class: this.classes.join(' ') }, h("button", { class: this.buttonClasses.join(' '), onClick: () => this.handleOpenModal(), innerHTML: this.icon })));
  }
};
DoogmaFullscreenButton.style = doogmaFullscreenButtonCss;

export { DoogmaFullscreenButton as doogma_fullscreen_button };
