import { inject, injectable } from "inversify"
import {makeObservable, observable, action, runInAction, computed} from "mobx"

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

    loadProductById = async (productId: number) => {
        this.isLoading = true

        // const product = await this.api.get<Product>(`products/${productId}`)
        const product: Product = {
            imagesUrls: [
                "https://rollingstoneindia.com/wp-content/uploads/2023/02/Dio-Phantom-Blood-960x739.jpg",
                "https://sportshub.cbsistatic.com/i/2021/03/18/0aa8956b-e410-4dd4-8ae3-b10ecaf60383/jojo-s-bizarre-adventure-fem-dio-brando-cosplay-1246413.jpg",
                "https://static.jojowiki.com/images/b/b5/latest/20220116051744/DIO_Normal_SC_Infobox_Manga.png",
                "https://static.jojowiki.com/images/thumb/6/69/latest/20201130220440/Jotaro_SC_Infobox_Manga.png/400px-Jotaro_SC_Infobox_Manga.png",
                "https://www.themarysue.com/wp-content/uploads/2022/12/JoJos-Bizarre-Adventure-Giorgio.webp?fit=1920%2C1080",
                "https://img1.ak.crunchyroll.com/i/spire2/95904c52f5c6454d05bd271f75e2946b1649069136_main.jpg"
            ],
            title: "Dio Brando",
            price: 1337,
            article: 123,
            characteristics: {
                "First": "some bredik",
                "Next-wow": "that's ficko"
            },
            descriptionParagraphs: [
                "Nice nice nice nice nice nice nice nice nice nice nice",
                "Bredik Bredik Bredik Bredik Bredik Bredik Bredik Bredik",
            ]
        }

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
