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
                "https://img1.ak.crunchyroll.com/i/spire2/95904c52f5c6454d05bd271f75e2946b1649069136_main.jpg",
                "data:image/jpeg;base64,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",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDg_Bab29RE5e0f1DTb8ORvhCs8hnZUhZMA&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqYYWsiDsEAysUjfnux3zf274qG89l0Xcfg&usqp=CAU"
            ],
            title: "Dio Brando",
            price: 1337,
            article: 123,
            characteristics: {
                "First": "some bredik",
                "Next-wow": "that's ficko"
            },
            descriptionParagraphs: [
                "Изолировочная машина для труб Вьюн-219 спроектирована для выполнения работ по ручной изоляции трубопроводов\n" +
                "диаметром от 57 до 219 мм. Ручное приспособление для нанесения ленточной изоляции на трубы, изготавливается с 2-\n" +
                "мяи 3-мя шпулями, что позволяет наносить двухслойную либо трехслойную изоляцию. Мы рекомендуем использовать\n" +
                "данную модель на трубопроводах длиной до 150 м, на большую длину лучше применять машину с бензиновым\n" +
                "приводом." +
                "Устройство Вьюн-219 прекрасное решение для нанесения изоляции со скоростью до 3-4 м в минуту, как на трассе в\n" +
                "полевых условиях, так и на участках сварки «плетей». Процесс работы с приспособлением прост, шпули крепятся к раме\n" +
                "с помощью штырей и шплинтов. Передняя шпуля наматывает первый слой ленты. По первому слою ленты катятся\n" +
                "обрезиненные колеса. Сзади расположены шпули, которые наматывают еще слой ленты.",
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