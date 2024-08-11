<script setup>
import { state } from '../../store/totem-store';
import { brl, format_timestamp, translate_status } from '../../utils/formatters';
</script>

<template>
    <div class="flex flex-col h-full justify-center">
        <div class="flex flex-col gap-4 mb-8">
            <h1 class="text-5xl font-bold text-red-500 mb-2">
                Pedido Aprovado!
            </h1>
            <p class="text-3xl font-thin mb-2">
                Muito obrigado por escolher o Totem Express!
            </p>

            <p class="text-2xl font-bold mb-8">
                Detalhes do Pedido:
            </p>
        </div>

        <div class="flex flex-col gap-4 shadow p-4 mb-8">
            <dl class="grid grid-cols-2">
                <dt class="font-bold">
                    Pedido
                </dt>
                <dd>
                    #{{ state.order.id }}
                </dd>
            </dl>

            <dl v-if="state.order.possibleUserView" class="grid grid-cols-2">
                <dt class="font-bold">
                    Cliente
                </dt>
                <dd>
                    {{ state.order.possibleUserView.name }}
                </dd>
            </dl>

            <dl class="grid grid-cols-2">
                <dt class="font-bold">
                    Data do Pedido:
                </dt>
                <dd>
                    {{ format_timestamp(state.order.createdAt) }}
                </dd>
            </dl>

            <dl class="grid grid-cols-2">
                <dt class="font-bold">
                    Status
                </dt>
                <dd>
                    {{ translate_status(state.order.status) }}
                </dd>
            </dl>

            <dl class="grid grid-cols-2">
                <dt class="font-bold">
                    Total
                </dt>
                <dd>
                    {{ brl(state.order.total) }}
                </dd>
            </dl>
        </div>
        <div>
            <p class="text-2xl font-bold mb-8">
                Itens do Pedido
            </p>
            <ul class="list-disc">
                <li class="list-inside mb-4" v-for="item in state.order.items">
                    {{ item.quantity }}x {{ item.name }} = {{ brl(item.price) }}
                </li>
            </ul>
        </div>
    </div>
</template>
