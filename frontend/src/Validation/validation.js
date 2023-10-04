import * as Yup from 'yup'

export const CategoreySchema = Yup.object({
    categorey:Yup.string().min(2).max(30).required("Please enter department Name"),
    description:Yup.string().min(2).max(30).required("Please enter description")
})