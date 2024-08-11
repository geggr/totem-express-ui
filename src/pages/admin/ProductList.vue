<script setup>
import { ref, toRaw } from 'vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { brl } from '../../utils/formatters'

import CreateProductModal from '../../components/CreateProductModal.vue';
import EditProductModal from '../../components/EditProductModal.vue';
import { create_product, delete_product, edit_product, get_all_products } from '../../api/product-gateway';

const queryClient = useQueryClient()

const editProductModal = ref(null)
const product = ref({})

const { isPending, isError, data: categories, error } = useQuery({
    queryKey: ['products'],
    queryFn: get_all_products
})

const invalidateProducts = () => queryClient.invalidateQueries({ queryKey: ['products'] })

const editProductMutation = useMutation({
    mutationFn: edit_product,
    onSuccess: invalidateProducts,
    onError: (error) => console.log(error)
})

const createProductMutation = useMutation({
    mutationFn: create_product,
    onSuccess: invalidateProducts
})

const deleteProductMutation = useMutation({
    mutationFn: delete_product,
    onSuccess: invalidateProducts
})

function openEditModalFor(selected) {
    product.value = toRaw(selected)
    editProductModal.value.showPopover()
}

function handleSetupModal(reference) {
    editProductModal.value = reference.value
}

function handleEditProduct() {
    editProductMutation.mutate({ ...product.value })
    editProductModal.value.hidePopover()
}

function handleCreateProduct(params) {
    createProductMutation.mutate(params)
}

function deleteProduct(id) {
    deleteProductMutation.mutate({ id })
}

</script>

<template>


    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <div v-else class="p-8">
        <div class="mb-10 flex justify-between">
            <h1 class="text-3xl font-bold uppercase">
                Produtos Disponíveis no Totem
            </h1>
            <button popovertarget="create-modal" popovertarget-action="show"
                class="bg-red-500 hover:bg-red-800 font-bold max-w-64 p-4 rounded-md text-white">
                Cadastrar Produto
            </button>
        </div>

        <div v-for="category in categories" class="mb-10">
            <h3 class="font-bold text-2xl mb-8"> {{ category.name }}</h3>
            <div class="grid grid-cols-2 gap-8">
                <div v-for="product in category.items">
                    <article class="h-full grid grid-rows-[210px,50px,1fr] shadow pt-4 p-8">
                        <div class="w-full">
                            <img :src="product.imagePath" class="w-full h-full object-contain">
                        </div>
                        <p class="font-thin text-lg text-center"> {{ product.name }}</p>
                        <div class="flex flex-col gap-4 w-full">

                            <dl class="grid grid-cols-2">
                                <dt class="font-bold">Descrição</dt>
                                <dd> {{ product.description }}</dd>
                            </dl>

                            <dl class="grid grid-cols-2">
                                <dt class="font-bold">Preço</dt>
                                <dd> {{ brl(product.price) }}</dd>
                            </dl>

                            <div class="flex w-full justify-between mt-4 gap-4 h-full">
                                <button @click="openEditModalFor(product)"
                                    class="flex-1 mt-auto bg-yellow-400 font-bold rounded-md hover:bg-yellow-600 p-3">
                                    Editar produto
                                </button>
                                <button @click="deleteProduct(product.id)"
                                    class=" mt-auto text-white bg-red-600 font-bold rounded-md hover:bg-red-800 p-3">
                                    Deletar Produto
                                </button>
                            </div>

                        </div>
                    </article>
                </div>
            </div>
        </div>

        <edit-product-modal :product="product" @handle-edit-product="handleEditProduct"
            @setup-modal="handleSetupModal" />
        <create-product-modal @handle-create-product="handleCreateProduct" />

    </div>
</template>