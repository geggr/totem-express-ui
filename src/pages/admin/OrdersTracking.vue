<script setup>

import { useQuery } from '@tanstack/vue-query';
import { brl, format_timestamp, translate_status } from '../../utils/formatters';
import { RouterLink } from 'vue-router';
import { get_all_orders } from '../../api/order-gateway';

const { isLoading, isError, data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: get_all_orders,
})

</script>
<template>
    <div class="mt-10">
        <div class="mb-10 flex justify-between">
            <h1 class="text-3xl font-bold uppercase">
                Pedidos do Totem
            </h1>
            <router-link :to="{ name: 'admin-products' }"
                class="bg-red-500 hover:bg-red-800 font-bold max-w-64 p-4 rounded-md text-white">
                Ver Produtos Cadastrados
            </router-link>
        </div>
        <span v-if="isLoading" class="animate-spin"> Carregando Pedidos... </span>
        <span v-else-if="isError">Houve um erro ao buscar os pedidos...</span>
        <div v-else>
            <ul class="grid grid-cols-3 gap-10">
                <li v-for="order in orders" :id="order.id" class="shadow-lg p-8 text-lg border">
                    <div class="flex flex-col gap-4">
                        <dl class="grid grid-cols-2">
                            <dt class="font-bold">
                                Pedido
                            </dt>
                            <dd>
                                #{{ order.id }}
                            </dd>
                        </dl>

                        <dl v-if="order.possibleUserView" class="grid grid-cols-2">
                            <dt class="font-bold">
                                Cliente
                            </dt>
                            <dd>
                                {{ order.possibleUserView.name }}
                            </dd>
                        </dl>

                        <dl class="grid grid-cols-2">
                            <dt class="font-bold">
                                Data do Pedido:
                            </dt>
                            <dd>
                                {{ format_timestamp(order.createdAt) }}
                            </dd>
                        </dl>

                        <dl class="grid grid-cols-2">
                            <dt class="font-bold">
                                Status
                            </dt>
                            <dd>
                                {{ translate_status(order.status) }}
                            </dd>
                        </dl>

                        <dl class="grid grid-cols-2">
                            <dt class="font-bold">
                                Total
                            </dt>
                            <dd>
                                {{ brl(order.total) }}
                            </dd>
                        </dl>
                        <hr />
                        <div>
                            <p class="font-bold mb-8">
                                Itens do Pedido
                            </p>
                            <ul class="list-disc">
                                <li class="list-inside mb-4" v-for="item in order.items">
                                    {{ item.quantity }}x {{ item.name }} = {{ brl(item.price) }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>