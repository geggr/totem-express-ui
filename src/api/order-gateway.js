import { HttpClient } from "../http/http-client";

const http = new HttpClient({ base_uri: "http://localhost:8080/api/order" })

export async function get_all_orders() {
    return http.retrieve({ resource: "/list" })
}

export async function create_order({ user_id, cart_items }) {
    const items = cart_items.map(
        item => ({
            productId: item.id,
            quantity: item.quantity
        })
    )

    return http.create({
        resource: "/create",
        params: {
            possibleUserId: user_id,
            orderItemsRequest: items
        }
    })
}