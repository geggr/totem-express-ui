import { HttpClient } from "../http/http-client"

const PRODUCT_CATEGORIES = [
    { name: "Lanches de Carne", code: "DISH" },
    { name: "Acompanhamentos", code: "SIDE_DISH" },
    { name: "Bebidas", code: "DRINK" },
    { name: "Sobremesas", code: "DESSERT" }
]

const http = new HttpClient({ base_uri: "http://localhost:8080/api/product" })

export async function get_all_products() {
    const responses = await Promise.allSettled(
        PRODUCT_CATEGORIES.map(category => {
            return http
                .retrieve({ resource: "/".concat(category.code) })
                .then(products => ({ code: category.code, name: category.name, items: products }))
        })
    )

    return responses.map(response => response.value)
}

export async function create_product({ name, description, imagePath, price, category }) {
    return http.create({
        params: {
            name,
            description,
            imagePath,
            price,
            category
        }
    })
}

export async function edit_product({ id, name, description, imagePath, price, category }) {
    return http.update({
        params: {
            id,
            name,
            description,
            imagePath,
            price,
            category
        }
    })
}

export async function delete_product({ id }) {
    return http.remove({ resource: "/".concat(id) })
}