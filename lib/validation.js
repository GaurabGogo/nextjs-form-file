import * as yup from "yup";

export const joinNowValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last Name is required"),
  city: yup.object().required("Please select a city").nullable(),
  profession: yup.object().required("Please select a profession").nullable(),
  ward: yup.object(),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, "Invalid phone number")
    .required("Phone is required"),
});
