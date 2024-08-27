import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string()
    .email("Formato de email inválido")
    .required("Email é obrigatório"),
  password: Yup.string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
  telephone: Yup.string().required("Telefone é obrigatório"),
  knowReact: Yup.boolean().required("Campo obrigatório"),
  referer: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Nome do referente é obrigatório"),
        telephone: Yup.string().required("Telefone do referente é obrigatório"),
      })
    )
    .min(1, "Pelo menos um referente é obrigatório")
    .required("Referente é obrigatório"),
});
