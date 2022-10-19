class Helper {

    productDataKey = "productDataKey";

    removeSpace(text: string): string
    {
        return text.replace(/\s/g, '');
    }

    removeWord(word: string, target: string): string
    {
        return target.replace(word, "");
    }
}

export default new Helper();