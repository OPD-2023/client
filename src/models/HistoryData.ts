export enum Status {
    LEFT = "left",
    RIGHT = "right"
}

export default interface HistoryData {
    readonly id: number
    readonly description: string
    readonly status: Status | null
    readonly imagePath: string | null
}