import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  fetchConsumerById,
  fetchConsumers,
  setConsumerAsync,
} from "../../store/consumer.action";
import { AppDispatch, RootState } from "../../store/store";
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
  const consumerId = Number(useParams().consumerId);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const selectedConsumer = useSelector(
    (state: RootState) => state.consumers.selectedConsumer
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: selectedConsumer || initialValues,
  });

  console.log(selectedConsumer);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "referer",
  });

  useEffect(() => {
    if (consumerId) {
      dispatch(fetchConsumers());
      dispatch(fetchConsumerById(consumerId));
    }
  }, [consumerId, dispatch]);

  useEffect(() => {
    if (selectedConsumer) {
      reset(selectedConsumer);
    }
  }, [selectedConsumer, reset]);

  const onSubmit = (data: FormValues) => {
    if (data.id === null) {
      dispatch(setConsumerAsync({ ...data, id: null }));
    } else {
      dispatch(setConsumerAsync(data));
    }
    navigate("/");
  };

  return (
    <div>
      <h1>{consumerId ? "Editar Cliente" : "Novo Cliente"}</h1>
      <Link to="/">Clique aqui para voltar para a lista</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label htmlFor="name">Nome</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.name && (
            <div className="error-message">{errors.name.message}</div>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input type="email" {...field} />}
          />
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label htmlFor="password">Senha</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <input type="password" {...field} />}
          />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label htmlFor="telephone">Telefone</label>
          <Controller
            name="telephone"
            control={control}
            render={({ field }) => (
              <InputMask {...field} mask="(99)99999-9999" />
            )}
          />
          {errors.telephone && (
            <div className="error-message">{errors.telephone.message}</div>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <label>
            <Controller
              name="knowReact"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <input
                  type="checkbox"
                  onChange={onChange}
                  onBlur={onBlur}
                  checked={value}
                  ref={ref}
                />
              )}
            />
            Você conhece React?
            {errors.knowReact && (
              <div className="error-message">{errors.knowReact.message}</div>
            )}
          </label>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
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
              <Controller
                name={`referer.${index}.name`}
                control={control}
                render={({ field }) => <input {...field} />}
              />
              {errors.referer?.[index]?.name && (
                <div className="error-message">
                  {errors.referer[index]?.name?.message}
                </div>
              )}

              <label htmlFor={`referer.${index}.telephone`}>
                Telefone da Referência
              </label>
              <Controller
                name={`referer.${index}.telephone`}
                control={control}
                render={({ field }) => (
                  <InputMask {...field} mask="(99)99999-9999" />
                )}
              />
              {errors.referer?.[index]?.telephone && (
                <div className="error-message">
                  {errors.referer[index]?.telephone?.message}
                </div>
              )}

              <button type="button" onClick={() => remove(index)}>
                Remover Referência
              </button>
            </div>
          ))}
          <button
            type="button"
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

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
