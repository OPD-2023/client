import {makeObservable, observable, runInAction, reaction} from "mobx"

import ApiClient from "@api/client"
import Product from "@models/Product"

export default class ProductsSearchStore {
    /** millis */
    private static readonly DEBOUNCING_TIME = 1_000

    field: string = ""
    products: Product[] | null = null
    productsAreLoading: boolean = false
    private debouncingTimer?: NodeJS.Timeout

    constructor(private readonly api: ApiClient) {
        makeObservable(this, {
            field: observable,
            products: observable,
            productsAreLoading: observable
        })

        // TODO: заменить на autorun, если это будет возможно
        reaction(() => this.field, this.handleFieldChangeDebounced)
    }

    private handleFieldChangeDebounced = (): void => {
        if (this.debouncingTimer) {
            clearTimeout(this.debouncingTimer)
        }

        this.debouncingTimer = setTimeout(this.handleFieldChange, ProductsSearchStore.DEBOUNCING_TIME)
    }

    private handleFieldChange = (): void => {
        if (this.field) {
            this.fetchProductsByField()
        } else {
            this.products = null
            this.productsAreLoading = false
        }
    }

    private fetchProductsByField = async () => {
        this.productsAreLoading = true

        try {
            // const products = await this.api.get<Product[]>("products", {similarTo: this.field})
            const products = await new Promise<Product[]>(resolve => {
                setTimeout(() => {
                    const titles = [
                        "ficko",
                        "dw",
                        "wadawd",
                        "wadajwd",
                        "sasasas",
                        "adawdawd",
                        "whauwdhawdi",
                        "wadjawdk",
                        "wadnw"
                    ]

                    resolve([2, 4, 5, 1, 2, 7, 9, 10, 12, 4].map(id => ({
                        imageURL: "wad",
                        title: _.sample(titles),
                        price: 1334,
                        article: id + 120
                    })))
                }, 1_500)
            })

            /**
             *
             * Если запрос не был прерван
             *
             * Пример прерванного запроса: пользователь ввёл что-либо, запрос ушёл, а пользователь решил очистить поле ввода
             */
            if (this.productsAreLoading) {
                /** ВАЖНО: не забываем вносить данные транзакцией, дабы разгрузить MobX и не было UI искажений */
                runInAction(() => {
                    this.products = products
                    this.productsAreLoading = false
                })
            }
        } catch {
            runInAction(() => {
                this.products = null
                this.productsAreLoading = false
            })
        }
    }
}
