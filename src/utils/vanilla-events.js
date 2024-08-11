export const toggleScrollOnModalEvent = ({ newState }) => {
    if (newState === "open") {
        document.body.classList.add('no-scroll')
    }
    else {
        document.body.classList.remove('no-scroll')
    }
}