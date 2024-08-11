export class HttpClient {

    constructor({ base_uri }) {
        this.url = base_uri
    }

    async retrieve({ resource = "", query }) {
        const params = query ? `?${query}` : ""
        const response = await fetch(`${this.url}${resource}${params}`)

        if (!response.ok) return null

        return response.json()
    }

    async remove({ resource }) {
        return fetch(`${this.url}${resource}`, { method: 'DELETE' })
    }

    async create({ resource = "", params }) {
        const response = await fetch(`${this.url}${resource}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        if (!response.ok) return null

        return response.json()
    }

    async update({ resource = "", params }) {
        const response = await fetch(`${this.url}${resource}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        if (!response.ok) return null

        return response.json()
    }
}