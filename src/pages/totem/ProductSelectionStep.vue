<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation, useQuery } from '@tanstack/vue-query';

import {
    state,
    getCurrentTotemUser,
    addItemToCart,
    removeItemFromCart,
    addOrderReceiptToTotem
} from '../../store/totem-store';

import { brl } from '../../utils/formatters';

import { get_all_products } from '../../api/product-gateway';
import { create_order } from '../../api/order-gateway';

const route = useRoute()
const router = useRouter()

const { id, name } = getCurrentTotemUser()

const filter = ref("")

const { isLoading, data: categories } = useQuery({
    queryKey: ['products'],
    queryFn: get_all_products
})

const mutation = useMutation({
    mutationFn: create_order,
    onSuccess: (order) => addOrderReceiptToTotem(order)
})

const category = computed(
    () => {
        if (categories.value === undefined) return

        const current = filter.value

        return categories
            .value
            .filter(it => it.code === current)
            .at(0)
    }
)

function changeCurrentCategory(nextCategory) {
    filter.value = nextCategory
}

async function handleCreateOrder() {
    await mutation.mutateAsync({
        user_id: id,
        cart_items: Object.values(state.cart.items)
    })

    router.push('/resume')
}

onMounted(
    () => {
        const hash = route.hash?.replace("#", "").toUpperCase()
        const value = (hash !== "") ? hash : "DISH"

        filter.value = value
    }
)
</script>

<template>
    <div class="pt-10 relative">
        <h1 class="text-2xl font-bold">
            Bem vindo <span v-if="name">, {{ name }}</span>!
        </h1>
        <p class="text-xl font-thin mb-8">O que deseja pedir hoje?</p>
        <div class="flex gap-8">
            <div id="filters" class="flex flex-col gap-8 w-full max-w-52 py-8 rounded-md border border-slate-300">
                <a href="#dish" class="flex flex-col items-center" @click="changeCurrentCategory('DISH')">
                    <div class="w-32">
                        <img class="w-full h-full"
                            src="https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$k6XhRUE7/200/200/original?country=br"
                            loading="lazy" />
                    </div>
                    Sanduiches
                </a>
                <a href="#side_dish" class="flex flex-col items-center" @click="changeCurrentCategory('SIDE_DISH')">
                    <div class="w-32">
                        <img class="w-full h-full"
                            src="https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$k8XpwlXZ/200/200/original?country=br"
                            loading="lazy" />
                    </div>
                    Acompanhamentos
                </a>
                <a href="#drink" class="flex flex-col items-center" @click="changeCurrentCategory('DRINK')">
                    <div class="w-32">
                        <img class="w-full h-full"
                            src="https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kUXY3lKf/200/200/original?country=br"
                            loading="lazy" />
                    </div>
                    Bebidas
                </a>
                <a href="#dessert" class="flex flex-col items-center" @click="changeCurrentCategory('DESSERT')">
                    <div class="w-32">
                        <img class="w-full h-full"
                            src="https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kxX1aUjQ/200/200/original?country=br"
                            loading="lazy" />
                    </div>
                    Sobremesas
                </a>
            </div>
            <span v-if="isLoading">Carregando Produtos...</span>
            <div v-if="category">
                <h3 class="font-bold text-2xl mb-8"> {{ category.name }}</h3>
                <div class="grid grid-cols-2 gap-8">
                    <div v-for="item in category.items">
                        <article class="grid grid-rows-[210px,50px,1fr] shadow pt-4">
                            <div class="w-full">
                                <img :src="item.imagePath" class="w-full h-full object-contain">
                            </div>
                            <p class="font-thin text-lg text-center"> {{ item.name }}</p>
                            <div class="flex flex-col">
                                <button class="w-full bg-yellow-400 text-black p-2" @click="addItemToCart(item)">
                                    Adicionar ao carrinho
                                </button>
                                <button class="w-full bg-red-500 text-white p-2" @click="removeItemFromCart(item)">
                                    Remover do Carrinho
                                </button>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
            <section class="w-[500px] h-full top-[100px] sticky ">
                <h1 class="text-2xl font-bold mb-8">Resumo do Pedido</h1>
                <ul class="list-disc mb-8">
                    <li v-for="item in state.cart.items">
                        {{ item.quantity }}x {{ item.name }} = {{ brl(item.quantity * item.price) }}
                    </li>
                </ul>
                <p class="font-bold mb-8">Total {{ brl(state.cart.total) }}</p>

                <button @click="handleCreateOrder" class="w-full bg-yellow-400 font-bold text-xl p-2 rounded-md">
                    Finalizar Pedido
                </button>
            </section>
        </div>
    </div>


</template>
