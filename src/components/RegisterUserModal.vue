<script setup>
import { ref, watch } from 'vue';
import { toggleScrollOnModalEvent } from '../utils/vanilla-events';

const modal = ref(null)

watch(modal, (it) => {
    if (it === null) return
    it.addEventListener('toggle', toggleScrollOnModalEvent)
})

const emitter = defineEmits(['handleCreateUser'])

const user = ref({
    name: '',
    email: '',
    cpf: '',
})

function registerUser() {
    emitter('handleCreateUser', { ...user.value })
    modal.value.hidePopover()
    user.value = {
        name: '',
        email: '',
        cpf: '',
    }
}
</script>

<template>
    <div popover id="create-user-modal" ref="modal">
        <h1 class="font-bold text-3xl text-center mb-8">Informações Pessoais</h1>
        <div class="flex w-full">
            <form @submit.prevent="registerUser" class="flex flex-col gap-8 w-full">
                <div class="flex flex-col">
                    <label>Nome: </label>
                    <input class="px-2 py-4 border border-slate-200" type="text" v-model="user.name">
                </div>

                <div class="flex flex-col">
                    <label>Email: </label>
                    <input class="px-2 py-4 border border-slate-200" type="text" v-model="user.email">
                </div>

                <div class="flex flex-col">
                    <label>CPF: </label>
                    <input class="px-2 py-4 border border-slate-200" type="text" v-model="user.cpf">
                </div>

                <div class="flex gap-4">
                    <button type="submit"
                        class="p-4 rounded-md w-full text-white bg-red-600 font-bold text-lg hover:bg-red-800">
                        Registrar
                    </button>
                    <button popovertarget="create-user-modal" popovertarget-action="close" type="button"
                        class="p-4 w-full rounded-md  bg-slate-600 text-white font-bold text-lg hover:bg-slate-500">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>