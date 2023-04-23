import {action, computed, makeObservable, observable, reaction} from "mobx"

import Feedback from "@models/Feedback"
import LocalStorageKey from "@models/LocalStorageKey"
import mergeValidators from "@utils/mergeValidators"
import validateNotEmpty from "@utils/validateNotEmpty"
import validateEmail from "@utils/validateEmail"

/**
 * ВАЖНО: в приложении должен быть только один инстанс данного класса,
 * чтобы не было расчилловочки с localstorage, когда каждый экземпляр пытается записать туда что-то своё
 */
export default class FeedbackStore implements Feedback {
    /** millis */
    private static readonly DEBOUNCING_TIME: number = 250

    private debouncingTimer?: NodeJS.Timeout
    name: string = ""
    email: string = ""
    message: string = ""

    constructor() {
        makeObservable(this, {
            name: observable,
            email: observable,
            message: observable,
            nameErrors: computed,
            emailErrors: computed,
            messageErrors: computed,
            serialized: computed,
            copyFrom: action
        })

        this.importDataFromLocalStorage()

        window.addEventListener("storage", this.updateDataOnStorage)
        reaction(() => this.serialized, this.exportDataToLocalStorageDebounced)
    }

    get nameErrors(): string[] {
        return mergeValidators(validateNotEmpty)(this.name)
    }

    get emailErrors() {
        return mergeValidators(validateEmail)(this.email)
    }

    get messageErrors() {
        return mergeValidators(validateNotEmpty)(this.message)
    }

    get serialized(): string {
        return JSON.stringify({
            name: this.name,
            email: this.email,
            message: this.message
        })
    }

    copyFrom(feedback: Feedback): void {
        this.name = feedback.name
        this.email = feedback.email
        this.message = feedback.message
    }


    private updateDataOnStorage = (evt: StorageEvent): void => {
        if (evt.storageArea === localStorage && evt.key === LocalStorageKey.FEEDBACK) {
            const serializedLocalStorageData: string | null = evt.newValue

            if (serializedLocalStorageData && serializedLocalStorageData !== this.serialized) {
                this.copyFrom(JSON.parse(serializedLocalStorageData) as Feedback)
            }
        }
    }


    private importDataFromLocalStorage(): void {
        const serializedLocalStorageData: string | null = localStorage.getItem(LocalStorageKey.FEEDBACK)

        if (serializedLocalStorageData) {
            this.copyFrom(JSON.parse(serializedLocalStorageData) as Feedback)
        }
    }

    private exportDataToLocalStorageDebounced = (): void => {
        console.log("DEBOUNCED")

        if (this.debouncingTimer) {
            clearTimeout(this.debouncingTimer)
        }

        this.debouncingTimer = setTimeout(this.exportDataToLocalStorage, FeedbackStore.DEBOUNCING_TIME)
    }

    private exportDataToLocalStorage = (): void => {
        localStorage.setItem(LocalStorageKey.FEEDBACK, this.serialized)
    }
}
