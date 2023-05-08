import { inject, injectable } from "inversify"
import { makeObservable, observable, action, runInAction } from "mobx"

import ApiClient from "@api/client"
import type Product from "@models/Product"

@injectable()
export default class ProductPageStore {
    @observable
    currentProduct?: Product
    @observable
    primaryImageIndex: number = 0
    @observable
    count: number = 0
    @observable
    isLoading: boolean = true

    constructor(@inject(ApiClient) private readonly api: ApiClient) {
        makeObservable(this)
    }

    loadProductById = async (id: number) => {
        this.isLoading = true

        const product = await this.api.get<Product>(`products/${id}`)

        if (this.isLoading) {
            runInAction(() => {
                this.currentProduct = product
                this.isLoading = false
            })
        }
    }

    @action
    reset = () => {
        this.currentProduct = undefined
        this.primaryImageIndex = 0
        this.count = 0
        this.isLoading = true
    }
}
