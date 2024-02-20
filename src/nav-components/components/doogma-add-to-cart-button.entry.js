import { r as registerInstance, h } from './index-55235861.js';

const doogmaAddToCartButtonCss = ".doogma-add-to-cart-button-container button{padding:0.5rem 1rem;border:1px solid;cursor:pointer}";

const DoogmaAddToCartButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = 'Add to Cart';
    this.backgroundColor = '#000000';
    this.color = '#FFFFFF';
    this.classes = [
      'doogma-nav-component-container',
      'doogma-add-to-cart-button-container',
    ];
    this.onClickButton = (event) => {
      //console.log(event);
      event.preventDefault();
      if (window.hasOwnProperty('doogma')) {
        window['doogma'].saveDesign({
          success: function (ev) {
            //console.log(ev);
            //let savedDesign =
            document.dispatchEvent(new CustomEvent('doogmaAddToCartButtonClickedCallback', { detail: { ev } }));
          },
        });
      }
    };
  }
  render() {
    return (h("div", { class: this.classes.join(' ') }, h("button", { onClick: ev => this.onClickButton(ev), style: {
        backgroundColor: this.backgroundColor,
        borderColor: this.backgroundColor,
        color: this.color,
      } }, this.label)));
  }
};
DoogmaAddToCartButton.style = doogmaAddToCartButtonCss;

export { DoogmaAddToCartButton as doogma_add_to_cart_button };
