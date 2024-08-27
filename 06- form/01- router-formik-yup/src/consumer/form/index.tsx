import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
} from "formik";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useConsumer } from "../../context";
import { Consumer } from "../../model/consumer";
import { validationSchema } from "./validation";

const initialValues: Consumer = {
  id: 0,
  name: "",
  email: "",
  password: "",
  telephone: "",
  knowReact: false,
  referer: [{ id: 0, name: "", telephone: "" }],
};

const RegistrationForm = () => {
  const consumerId = useParams().consumerId;
  const { getConsumerById, setConsumer } = useConsumer();
  const [formValues, setFormValues] = useState<Consumer | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (consumerId !== undefined) {
      const consumer = getConsumerById(Number(consumerId));
      if (consumer) {
        setFormValues(consumer);
      }
    }
  }, [consumerId, getConsumerById]);

  return (
    <div>
      <h1>{consumerId ? "Editar Cliente" : "Novo Cliente"}</h1>
      <Link to="/">Clique aqui para voltar para a lista</Link>
      <Formik
        initialValues={formValues || initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (formValues) {
            setConsumer(values);
          } else {
            setConsumer({ ...values, id: undefined });
          }
          navigate("/");
        }}
      >
        {({ values }) => (
          <Form>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <label htmlFor="name">Nome</label>
              <Field name="name" type="text" />
              <ErrorMessage
                className="error-message"
                name="name"
                component="div"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage
                className="error-message"
                name="email"
                component="div"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <label htmlFor="password">Senha</label>
              <Field name="password" type="password" />
              <ErrorMessage
                className="error-message"
                name="password"
                component="div"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <label htmlFor="telephone">Telefone</label>
              <Field name="telephone">
                {({ field }: FieldProps) => (
                  <InputMask
                    {...field}
                    mask="(99)99999-9999" // Aplicando a máscara para telefone
                  />
                )}
              </Field>
              <ErrorMessage
                className="error-message"
                name="telephone"
                component="div"
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <label>
                <Field name="knowReact" type="checkbox" />
                Você conhece React?
              </label>
              <ErrorMessage
                className="error-message"
                name="knowReact"
                component="div"
              />
            </div>

            <FieldArray name="referer">
              {({ remove, push }) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                  }}
                >
                  {values.referer.map((_, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                        marginBottom: "20px",
                        padding: "10px",
                        border: "1px solid black",
                      }}
                    >
                      <label htmlFor={`referer.${index}.name`}>
                        Nome da Referência
                      </label>
                      <Field name={`referer.${index}.name`} type="text" />
                      <ErrorMessage
                        className="error-message"
                        name={`referer.${index}.name`}
                        component="div"
                      />

                      <label htmlFor={`referer.${index}.telephone`}>
                        Telefone da Referência
                      </label>
                      <Field name={`referer.${index}.telephone`}>
                        {({ field }: FieldProps) => (
                          <InputMask
                            {...field}
                            mask="(99) 99999-9999" // Aplicando a máscara para telefone
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        className="error-message"
                        name={`referer.${index}.telephone`}
                        component="div"
                      />

                      <button type="button" onClick={() => remove(index)}>
                        Remover Referência
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        id: values.referer.length,
                        name: "",
                        telephone: "",
                      })
                    }
                  >
                    Adicionar Referência
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit">Enviar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
