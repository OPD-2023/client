import "reflect-metadata"
import {makeObservable, observable, runInAction, reaction} from "mobx"
import {inject, injectable} from "inversify"

import ApiClient from "@api/client"
import Product from "@models/Product"
import DIContainerToken from "@models/DIContainerToken"

@injectable()
export default class ProductsSearchStore {
    /** millis */
    private static readonly DEBOUNCING_TIME = 1_000

    @observable
    field: string = ""
    @observable
    products: Product[] | null = null
    @observable
    productsAreLoading: boolean = false
    private debouncingTimer?: NodeJS.Timeout

    constructor(@inject(DIContainerToken.API_CLIENT_CONFIG) private readonly api: ApiClient) {
        makeObservable(this)

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
            const products = await this.api.get<Product[]>("products", {similarTo: this.field})

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
