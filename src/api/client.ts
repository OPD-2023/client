import { inject, injectable } from "inversify"

import HttpMethod from "@models/HttpMethod"
import Endpoint from "@models/Endpoint"
import Record from "@models/Record"
import ApiClientConfig from "@models/ApiClientConfig"
import DIContainerToken from "@models/DIContainerToken"

@injectable()
export default class ApiClient {

    private static createQueryString(params: Record): string {
        const queryStringWithoutPrefix = Object.entries(params).map(([key, value]) => `${key}=${value}`)

        return "?" + queryStringWithoutPrefix
    }

    private static createUri(endpoint: string, params?: Record): string {
        let URI = endpoint

        if (params) {
            URI += ApiClient.createQueryString(params)
        }

        return URI
    }


    constructor(@inject(DIContainerToken.API_CLIENT_CONFIG) private readonly config: ApiClientConfig) {
    }

    private createUrl(endpoint: string, params?: Record): string {
        return `${this.config.baseURL}/${ApiClient.createUri(endpoint, params)}`
    }

    /**
     *
     * @type R serves as response type
     */
    public request<R>(method: HttpMethod, endpoint: Endpoint, params?: Record, body?: XMLHttpRequestBodyInit): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            const XHR = new XMLHttpRequest()

            XHR.open(method, this.createUrl(endpoint, params))

            XHR.onload = () => {
                resolve(XHR.response)
            }

            XHR.onerror = () => {
                reject(XHR.response)
            }

            XHR.send(body)
        })
    }

    /**
     *
     * @type R serves as response type
     */
    public get<R>(endpoint: Endpoint, params?: Record): Promise<R> {
        return this.request<R>("GET", endpoint, params)
    }

    /**
     *
     * @type R serves as response type
     * @type B serves as body type
     */
    public post<R, B>(endpoint: Endpoint, body: B, params?: Record): Promise<R> {
        if (body instanceof FormData) {
            return this.request<R>("POST", endpoint, params, body)
        }
        return this.request<R>("POST", endpoint, params, JSON.stringify(body))
    }
}
