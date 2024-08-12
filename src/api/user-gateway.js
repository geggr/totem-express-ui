import { HttpClient } from "../http/http-client";

const http = new HttpClient({ base_uri: "http://localhost:8080/api/users" })

export async function find_user(cpf) {
    const query = "document=".concat(cpf)
    return http.retrieve({ query })
}

export async function register({ name, email, cpf }) {
    return http.create({
        params: {
            name,
            email,
            cpf
        }
    })
}