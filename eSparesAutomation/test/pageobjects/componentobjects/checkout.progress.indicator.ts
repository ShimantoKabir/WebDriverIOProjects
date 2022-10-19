export default class CheckoutProgressIndicator {

    checkoutFirstStepSelector: string = "li.step1";
    checkoutSecondStepSelector: string = "li.step2";
    checkoutThirdStepSelector: string = "li.step3";
    checkoutCurrentStepClassName: string = "current";

    public get checkoutFirstStep() {
        return $(this.checkoutFirstStepSelector);
    }

    public get checkoutSecondStep() {
        return $(this.checkoutSecondStepSelector);
    }

    public get checkoutThirdStep() {
        return $(this.checkoutThirdStepSelector);
    }

}