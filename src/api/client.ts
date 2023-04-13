import HttpMethod from "@models/HttpMethod"
import Endpoint from "@models/Endpoint"
import QueryParams from "@models/QueryParams"
import ApiClientConfig from "@models/ApiClientConfig";

export default class ApiClient {

    private static createQueryString(params: QueryParams): string {
        const queryStringWithoutPrefix = Object.entries(params).map(([key, value]) => `${key}=${value}`)

        return "?" + queryStringWithoutPrefix
    }

    private static createURI(endpoint: string, params?: QueryParams): string {
        let URI = endpoint

        if (params) {
            URI += ApiClient.createQueryString(params)
        }

        return URI
    }


    constructor(private readonly config: ApiClientConfig) {
    }

    private createURL(endpoint: string, params?: QueryParams): string {
        return `${this.config.baseURL}/${ApiClient.createURI(endpoint, params)}`
    }

    /**
     *
     * @type R serves as response type
     */
    public request<R>(method: HttpMethod, endpoint: Endpoint, params?: QueryParams, body?: XMLHttpRequestBodyInit): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            const XHR = new XMLHttpRequest()

            XHR.open(method, this.createURL(endpoint, params))

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
    public get<R>(endpoint: Endpoint, params?: QueryParams): Promise<R> {
        return this.request<R>("GET", endpoint, params)
    }

    /**
     *
     * @type R serves as response type
     * @type B serves as body type
     */
    public post<R, B>(endpoint: Endpoint, body: B, params?: QueryParams): Promise<R> {
        if (body instanceof FormData) {
            return this.request<R>("POST", endpoint, params, body)
        }
        return this.request<R>("POST", endpoint, params, JSON.stringify(body))
    }
}
