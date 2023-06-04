import NotificationType from "@models/NotificationType"

export default interface Notification {
    readonly id: string;
    readonly type: NotificationType;
    readonly text: string;
    /** millis */
    readonly lifetime?: number;
}
