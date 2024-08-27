import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useConsumerStore } from "../../context";
import { FormValues, schema } from "./validation";

const initialValues: FormValues = {
  id: null,
  name: "",
  email: "",
  password: "",
  telephone: "",
  knowReact: false,
  referer: [{ id: 0, name: "", telephone: "" }],
};

const RegistrationForm = () => {
  const consumerId = useParams().consumerId;
  const getConsumerById = useConsumerStore((state) => state.getConsumerById);
  const setConsumer = useConsumerStore((state) => state.setConsumer);
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: formValues || initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "referer",
  });

  useEffect(() => {
    if (consumerId !== null) {
      const consumer = getConsumerById(Number(consumerId));
      if (consumer !== undefined && consumer.id !== undefined) {
        setFormValues(consumer);
        reset(consumer);
      }
    }
  }, [consumerId, getConsumerById, reset]);

  const onSubmit = (data: FormValues) => {
    if (data.id === null) {
      setConsumer({ ...data, id: null });
    } else {
      setConsumer(data);
    }
    navigate("/");
  };

  return (
    <div className="container card my-4">
      <div className="card-body">
        <h1>{consumerId ? "Editar Cliente" : "Novo Cliente"}</h1>
        <Link to="/" className="btn btn-secondary mb-3">
          Voltar para a lista
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input className="form-control" {...field} />
              )}
            />
            {errors.name && (
              <div className="text-danger">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="email" className="form-control" {...field} />
              )}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input type="password" className="form-control" {...field} />
              )}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="telephone" className="form-label">
              Telefone
            </label>
            <Controller
              name="telephone"
              control={control}
              render={({ field }) => (
                <InputMask
                  className="form-control"
                  {...field}
                  mask="(99)99999-9999"
                />
              )}
            />
            {errors.telephone && (
              <div className="text-danger">{errors.telephone.message}</div>
            )}
          </div>

          <div className="mb-3 form-check">
            <Controller
              name="knowReact"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={onChange}
                  onBlur={onBlur}
                  checked={value}
                  ref={ref}
                />
              )}
            />
            <label className="form-check-label">
              Você conhece React?
              {errors.knowReact && (
                <div className="text-danger">{errors.knowReact.message}</div>
              )}
            </label>
          </div>

          <div className="mb-3">
            {fields.map((field, index) => (
              <div key={field.id} className="border p-3 mb-3">
                <div className="mb-3">
                  <label
                    htmlFor={`referer.${index}.name`}
                    className="form-label"
                  >
                    Nome da Referência
                  </label>
                  <Controller
                    name={`referer.${index}.name`}
                    control={control}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  />
                  {errors.referer?.[index]?.name && (
                    <div className="text-danger">
                      {errors.referer[index]?.name?.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor={`referer.${index}.telephone`}
                    className="form-label"
                  >
                    Telefone da Referência
                  </label>
                  <Controller
                    name={`referer.${index}.telephone`}
                    control={control}
                    render={({ field }) => (
                      <InputMask
                        className="form-control"
                        {...field}
                        mask="(99)99999-9999"
                      />
                    )}
                  />
                  {errors.referer?.[index]?.telephone && (
                    <div className="text-danger">
                      {errors.referer[index]?.telephone?.message}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => remove(index)}
                >
                  Remover Referência
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                append({
                  id: fields.length,
                  name: "",
                  telephone: "",
                })
              }
            >
              Adicionar Referência
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
