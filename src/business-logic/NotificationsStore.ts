import { injectable } from "inversify"
import {action, makeObservable, observable, runInAction} from "mobx"
import Notification from "@models/Notification"

@injectable()
export default class NotificationsStore {
    @observable
    list: Notification[] = []

    constructor() {
        makeObservable(this)
    }

    append = (...notificationsList: Notification[]): void => {
        runInAction(() => this.list.push(...notificationsList))
        notificationsList.forEach(notification => {
            if (notification.lifetime !== undefined) {
                setTimeout(() => this.removeById(notification.id), notification.lifetime)
            }
        })
    }

    @action
    removeById = (notificationId: string) => {
        this.list = this.list.filter(addedNotification => addedNotification.id !== notificationId)
    }
}