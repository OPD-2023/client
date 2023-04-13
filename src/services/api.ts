import ApiClient from "@api/client"
import ApiClientConfig from "@models/ApiClientConfig"
import appConfig from "@app-config"

const api = new ApiClient(appConfig as ApiClientConfig)

export default api
