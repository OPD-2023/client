import {makeObservable, observable} from "mobx"
import {inject, injectable} from "inversify"

import ApiClient from "../services/api.client"
import Group from "@models/Group"

@injectable()
export default class GroupsCatalogStore {
    /** millis */
    private static readonly VISIBILITY_CHANGING_DELAY_TIME = 300

    @observable
    groups: Group[] | null = null
    @observable
    isVisible: boolean = false
    private visibilityChangingTimer?: NodeJS.Timeout

    constructor(@inject(ApiClient) private readonly api: ApiClient) {
        makeObservable(this)
    }

    loadMainGroups = async () => {
        // this.groups = await this.api.get<Group[]>("groups/main")
        this.groups = [
            { id: 1, title: "Бредик" },
            { id: 2, title: "Чтоооо" },
            { id: 3, title: "Рандом" },
            { id: 4, title: "Бредятина" },
        ]
    }

    scheduleVisibilityChange(isVisible: boolean): void {
        if (this.visibilityChangingTimer) {
            clearTimeout(this.visibilityChangingTimer)
        }

        this.visibilityChangingTimer = setTimeout(() => {
            if (this.isVisible !== isVisible) {
                this.isVisible = isVisible
            }
        }, GroupsCatalogStore.VISIBILITY_CHANGING_DELAY_TIME)
    }
}
