import Validator from "@models/Validator"

const validateEmail: Validator<string> = value => {
    if (!value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)) {
        return "Укажите реальный email"
    }

    return null
}

export default validateEmail
