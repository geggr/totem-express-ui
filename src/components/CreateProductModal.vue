<script setup>
import { ref, watch } from 'vue';
import { toggleScrollOnModalEvent } from '../utils/vanilla-events';

const modal = ref(null)

watch(modal, (it) => {
    if (it === null) return
    it.addEventListener('toggle', toggleScrollOnModalEvent)
})

const emitter = defineEmits(['handleCreateProduct'])

const categories = [
    { code: "DISH", name: "Lanches" },
    { code: "SIDE_DISH", name: "Acompanhamento" },
    { code: "DRINK", name: "Bebidas" },
    { code: "DESSERT", name: "Sobremesa" },
]

const product = ref({
    name: '',
    imagePath: '',
    description: '',
    price: '',
    category: '',
})

function createProduct() {
    emitter('handleCreateProduct', { ...product.value })
    modal.value.hidePopover()
    product.value = {
        name: '',
        imagePath: '',
        description: '',
        price: '',
        category: '',
    }
}

</script>

<template>
    <div popover id="create-modal" ref="modal">
        <h1 class="font-bold text-3xl text-center mb-8"> Criar Produto </h1>
        <div class="flex w-full">
            <form @submit.prevent="createProduct" class="flex flex-col gap-8 w-full">
                <div class="h-36 w-full">
                    <img :src="product.imagePath" class="w-full h-full object-contain">
                </div>

                <div class="flex flex-col">
                    <label>Imagem: </label>
                    <input class="px-2 py-4 border border-slate-200" type="text" v-model="product.imagePath">
                </div>

                <div class="flex flex-col">
                    <label>Nome: </label>
                    <input class="px-2 py-4 border border-slate-200" type="text" v-model="product.name">
                </div>

                <div class="flex flex-col">
                    <label>Descrição: </label>
                    <textarea class="px-2 py-4 border border-slate-200 h-[10ch]" type="text"
                        v-model="product.description">
                        </textarea>
                </div>

                <div class="flex flex-col">
                    <label>Preço: </label>
                    <input class="px-2 py-4 border border-slate-200" type="number" step="0.1" v-model="product.price">
                </div>


                <div class="flex flex-col">
                    <label>Categoria: </label>
                    <select v-model="product.category" class="p-4 border border-slate-200 bg-white">
                        <option v-for="category in categories" :id="category.code" :value="category.code">
                            {{ category.name }}
                        </option>
                    </select>
                </div>

                <div class="flex gap-4">
                    <button type="submit"
                        class="p-4 rounded-md w-full bg-yellow-400 font-bold text-lg hover:bg-yellow-500">
                        Cadastrar Produto
                    </button>
                    <button popovertarget="modal" popovertarget-action="close" type="button"
                        class="p-4 w-full rounded-md  bg-slate-600 text-white font-bold text-lg hover:bg-slate-500">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>


</template>