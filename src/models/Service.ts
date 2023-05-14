type Subclause = {
    id: number
    content: string
}

export default interface Service {
    readonly id: number
    readonly title: string
    readonly description: string
    readonly subclauses: Subclause[]
}