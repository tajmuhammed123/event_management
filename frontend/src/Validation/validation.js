import * as Yup from 'yup'

export const CategoreySchema = Yup.object({
    categorey:Yup.string().min(2).max(30).required("Please enter department Name"),
    description:Yup.string().min(2).max(30).required("Please enter description"),
    eventlogo: Yup.mixed().required("choose a Photo")
})
export const ProfileUpdate = Yup.object({
    name:Yup.string().min(2).max(30).required("Please enter Name"),
    mob:Yup.string().min(2).max(11).required("Please enter Correct number"),
    profile_img: Yup.mixed().required("choose a Photo")
})