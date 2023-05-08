import Validator from "@models/Validator"

const mergeValidators = <T>(...validators: Validator<T>[]) => (value: T): string[] =>
    validators.map(validator => validator(value)).filter(Boolean) as string[]

export default mergeValidators
