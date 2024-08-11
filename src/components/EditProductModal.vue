<script setup>
import { ref, watch } from 'vue';
import { toggleScrollOnModalEvent } from '../utils/vanilla-events';

const { product } = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const emit = defineEmits([
    'handleEditProduct',
    'setupModal'
])

const modal = ref(null)

watch(
    modal,
    (it) => {
        if (it === null) return

        it.addEventListener('toggle', toggleScrollOnModalEvent)
        emit('setupModal', modal)
    }
)


function handleEdit() {
    emit('handleEditProduct')
}

</script>
<template>
    <div popover id="modal" ref="modal">
        <h1 class="font-bold text-3xl text-center mb-8"> Editar Produto </h1>
        <div class="flex w-full h-full">
            <form @submit.prevent="handleEdit" class="flex flex-col gap-8 w-full">
                <div class="h-36 w-full">
                    <img :src="product.imagePath" class="w-full h-full object-contain">
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
                <div class="flex gap-4 mt-auto">
                    <button type="submit"
                        class="p-4 rounded-md w-full bg-yellow-400 font-bold text-lg hover:bg-yellow-500">
                        Editar
                        Produto
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