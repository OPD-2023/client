type Subservice = {
    id: number
    description: string
}

export default interface Service {
    readonly id: number
    readonly title: string
    readonly description: string
    readonly sub_services: Subservice[]
}