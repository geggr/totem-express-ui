// const BASE_URI = "http://localhost:8080/api"

// const PRODUCT_CATEGORIES = [
//     { name: "Lanches de Carne", code: "DISH" },
//     { name: "Acompanhamentos", code: "SIDE_DISH" },
//     { name: "Bebidas", code: "DRINK" },
//     { name: "Sobremesas", code: "DESSERT" }
// ]

// async function get(url) {
//     const response = await fetch(url)

//     return response.json()
// }


// async function remove(url) {
//     return await fetch(url, {
//         method: 'DELETE',
//         headers: {
//             'content-type': 'application/json'
//         }
//     })
// }

// async function post(url, params) {
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(params)
//     })

//     return response.json()
// }

// async function put(url, params) {
//     const response = await fetch(url, {
//         method: 'PUT',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(params)
//     })

//     return response.json()
// }

// export async function create_user({ name, email, cpf }) {
//     const endpoint = BASE_URI.concat("/users")
//     return await post(endpoint, { name, email, cpf })
// }

// export async function fetch_user({ cpf }) {
//     const endpoint = BASE_URI.concat("/users").concat("?document=").concat(cpf)
//     try {
//         return await get(endpoint)
//     } catch (error) {
//         return null
//     }
// }

// export async function create_product({ name, description, imagePath, price, category }) {
//     const endpoint = BASE_URI.concat("/product")
//     await post(endpoint, { name, description, imagePath, price, category })
// }

// export async function edit_product({ id, name, description, imagePath, price, category }) {
//     const endpoint = BASE_URI.concat("/product")

//     await put(endpoint, {
//         id,
//         name,
//         description,
//         imagePath,
//         price,
//         category
//     })
// }

// export async function delete_product({ id }) {
//     const endpoint = BASE_URI.concat("/product").concat("/").concat(id)
//     await remove(endpoint)
// }

// export async function fetch_all_products() {
//     const endpoint = BASE_URI.concat("/product").concat("/")

//     const responses = await Promise.allSettled(
//         PRODUCT_CATEGORIES.map(category => {
//             const resource = endpoint.concat(category.code)
//             return get(resource).then(products => ({
//                 code: category.code,
//                 name: category.name,
//                 items: products
//             }))
//         })
//     )

//     const products = responses.map(response => response.value)

//     return products
// }

// export async function create_order({ user, items }) {
//     const endpoint = BASE_URI.concat("/order/create")

//     const request_items = items.map(
//         item => ({
//             productId: item.id,
//             quantity: item.quantity
//         })
//     )

//     return await post(endpoint, {
//         possibleUserId: user,
//         orderItemsRequest: request_items
//     })
// }

// export async function get_orders(params) {
//     const endpoint = BASE_URI.concat("/order/list")
//     return await get(endpoint)
// }