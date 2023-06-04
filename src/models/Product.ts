export default interface Product {
    /**
     *
     * TODO: Изменить @string на модель урла
     */
    readonly imagesUrls: string[];
    readonly title: string;
    readonly price: number;
    readonly article: string;
    readonly currency: "руб" | "евро" | "доллар";
    readonly rating: number;
}
