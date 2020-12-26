import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a Valid Email!')
    .required('Email is Required!'),
})

export default validationSchema
