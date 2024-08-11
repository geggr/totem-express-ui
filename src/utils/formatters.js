const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})

const STATUS_TRANSLATOR = {
    RECEIVED: 'Recebido pela Cozinha',
    PREPARING: 'Preparando',
    READY_TO_BE_PICKED_UP: 'Pronto',
    FINISHED: 'Finalizado'
}

const TIMESTAMP_FORMATTER = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})

export const brl = (amount) => CURRENCY_FORMATTER.format(amount)
export const format_timestamp = (timestamp) => TIMESTAMP_FORMATTER.format(new Date(timestamp))
export const translate_status = (status) => STATUS_TRANSLATOR[status]
