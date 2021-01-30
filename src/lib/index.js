import * as yup from "yup";

export const SignupSchema = yup.object({
  userName: yup
    .string()
    .min(6, "UserName is too short.")
    .max(30, "UserName is too long.")
    .required("this field is required"),
  email: yup.string().email().required("This field is required."),
  password: yup
    .string()
    .min(6, "Password is too short.")
    .max(20, "Password is too long.")
    .required("This field is required."),
});
export const SigninSchema = yup.object({
  email: yup.string().email().required("This field is required."),
  password: yup.string().required("This field is required."),
});
export const AddJobSchema = yup.object({
  companyName: yup
    .string()
    .max(25, "Company Name is too long")
    .required("this field is required"),
  title: yup
    .string()
    .max(25, "Job title is too long")
    .required("this field is required"),
  experience: yup
    .string()
    .max(25, "Experience description is too long.")
    .required("this field is required"),
  description: yup
    .string()
    .min(200, "your description is too short!")
    .max(2000, "Your description is too long!")
    .required("this field is required"),
});
