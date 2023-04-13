import {DomainHost, LocalHost} from "@models/Host"

export default interface ApiClientConfig {
    baseURL: LocalHost | DomainHost
}
