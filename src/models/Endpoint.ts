export type ProductsEndpoint = "products" | `products/${number}`

export type GroupsEndpoint = "groups/main"

/**
 * Пока что моковый эндпоинт
 *
 * Здесь будут храниться реальные эндпоинты, когда будет готов бэк
 */
type Endpoint = ProductsEndpoint | GroupsEndpoint

export default Endpoint
