import Protocol from "@models/Protocol"

export type LocalHost = `localhost:${number}`

export type DomainHost = `${Protocol}://${string}.${string}`
