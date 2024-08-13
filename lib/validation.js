import * as yup from "yup";

export const joinNowValidationSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string(),
  lastName: yup.string(),
  city: yup.object(),
  profession: yup.object(),
  ward: yup.object(),
  phone: yup.string(),
});
