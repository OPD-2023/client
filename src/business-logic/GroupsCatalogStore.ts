import {makeObservable, observable} from "mobx"

import ApiClient from "@api/client"
import Group from "@models/Group"

export default class GroupsCatalogStore {
    /** millis */
    private static readonly VISIBILITY_CHANGING_DELAY_TIME = 300

    groups: Group[] | null = null
    isVisible: boolean = false
    private visibilityChangingTimer?: NodeJS.Timeout

    constructor(private readonly api: ApiClient) {
        makeObservable(this, {
            groups: observable,
            isVisible: observable
        })
    }

    fetchMainGroups = async () => {
        // this.groups = await this.api.get<Group[]>("groups/main")
        this.groups = [
            {id: 1, title: "Ficko"},
            {id: 2, title: "Kranz"},
            {id: 3, title: "Poki4"},
            {id: 4, title: "privet"},
            {id: 5, title: "doawd"},
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
