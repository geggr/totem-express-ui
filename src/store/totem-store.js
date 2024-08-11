import { reactive } from "vue";

export const state = reactive({
    user: {
        id: null,
        name: null
    },
    cart: {
        items: {

        },
        total: 0
    },
    order: {

    }
})

export const addItemToCart = (item) => {
    const id = item.id

    state.cart.total += item.price

    const current = state.cart.items[id]

    if (current !== undefined) {
        current.quantity++
        return
    }

    state.cart.items[id] = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
    }
}

export const removeItemFromCart = (item) => {
    const id = item.id

    const current = state.cart.items[id]

    if (current !== undefined) {
        current.quantity--

        if (current.quantity <= 0) {
            delete state.cart.items[id]
        }
    }
}

export const addOrderReceiptToTotem = (order) => {
    state.order = order
}

export const signInUserToTotem = (user) => {
    state.user.id = user.id
    state.user.name = user.name
}

export const getCurrentTotemUser = () => state.user