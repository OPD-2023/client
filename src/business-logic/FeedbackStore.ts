import {autorun, makeObservable, observable} from "mobx"

import Feedback from "@models/Feedback"
import LocalStorageKey from "@models/LocalStorageKey"

/**
 * ВАЖНО: в приложении должен быть только один инстанс данного класса,
 * чтобы не было расчилловочки с localstorage, когда каждый экземпляр пытается записать туда что-то своё
 */
export default class FeedbackStore implements Feedback {
    name: string = ""
    email: string = ""
    message: string = ""

    constructor() {
        makeObservable(this, {
            name: observable,
            email: observable,
            message: observable
        })

        this.importDataFromLocalStorage()

        autorun(this.exportDataToLocalStorage)
    }

    private importDataFromLocalStorage(): void {
        const stringifiedLocalStorageData: string | null = localStorage.getItem(LocalStorageKey.FEEDBACK)

        if (stringifiedLocalStorageData) {
            const localStorageData = JSON.parse(stringifiedLocalStorageData) as Feedback

            this.name = localStorageData.name
            this.email = localStorageData.email
            this.message = localStorageData.message
        }
    }

    private exportDataToLocalStorage = (): void => {
        localStorage.setItem(LocalStorageKey.FEEDBACK, JSON.stringify(this))
    }
}
