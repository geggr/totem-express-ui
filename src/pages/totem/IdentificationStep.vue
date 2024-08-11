<script setup>
import { ref } from 'vue'
import { signInUserToTotem } from '../../store/totem-store';
import { useRouter } from 'vue-router';
import RegisterUserModal from '../../components/RegisterUserModal.vue';
import { useMutation } from '@tanstack/vue-query';
import { find_user, register } from '../../api/user-gateway';

const router = useRouter()

const cpf = ref("")
const hasError = ref(false)

const mutation = useMutation({
    mutationFn: register,
    onSuccess: (user) => signInUserToTotem(user)
})

async function handleUserIdentification() {
    const user = await find_user(cpf.value)

    if (user === null) {
        hasError.value = true
        return
    }

    hasError.value = false

    signInUserToTotem(user)

    router.push('/product')
}

async function handleRegisterUser(information) {
    await mutation.mutateAsync(information)
    router.push('/product')
}

function handleSkipIdentification() {
    router.push("/product")
}

</script>
<template>
    <div class="flex flex-col h-full justify-center">
        <h1 class="text-5xl font-bold text-red-500 mb-4">Bem vindo ao Totem-Express</h1>

        <h1 class="text-5xl font-bold mb-8">
            Deseja se identificar?
        </h1>

        <form @submit.prevent="handleUserIdentification" class="flex flex-col gap-4 mb-8">
            <label for="cpf" class="font-thin"> Digite seu CPF </label>
            <div class="flex gap-2">
                <input type="text" id="cpf" v-model="cpf" class="w-80 border border-black py-2 px-4 rounded-md">
                <button type="submit"
                    class="block w-28 bg-red-600 font-bold text-lg text-white p-4 rounded-md">Entrar</button>
            </div>
            <p v-if="hasError" class="font-bold text-2xl">
                Não foi possível encontrar nem um usuário em nossa base...
            </p>
        </form>
        <div class="flex flex-col items-start">
            <button class="underline text-lg font-thin text-red-600" popovertarget="create-user-modal"
                popovertarget-action="show">
                Se cadastrar.
            </button>
            <button @click="handleSkipIdentification" class="underline text-lg font-thin">
                Entrar sem se registrar.
            </button>
        </div>
    </div>
    <register-user-modal @handle-create-user="handleRegisterUser" />
</template>
