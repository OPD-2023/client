import Validator from "@models/Validator"

const validateNotEmpty: Validator<string> = value => {
    if (!value) {
        return "Обязательно к заполнению"
    }

    return null
}

export default validateNotEmpty
