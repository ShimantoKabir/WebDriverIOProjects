export default class FooterComponent {

	checkoutFooterSelector: string = "div.footer-wrapper.checkout-footer";

	public get checkoutFooter() {
		return $(this.checkoutFooterSelector);
	}

	public scrollDownToCheckoutFooter() {
		return this.checkoutFooter.scrollIntoView();
	}

}