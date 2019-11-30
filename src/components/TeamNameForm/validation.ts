import * as yup from 'yup'

export const teamNameValidation = yup.string().min(2).max(10).required()
