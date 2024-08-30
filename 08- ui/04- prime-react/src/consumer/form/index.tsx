import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
    <Card
      title={consumerId ? "Editar Cliente" : "Novo Cliente"}
      className="p-mb-4"
    >
      <Link to="/" className="p-button p-component p-button-outlined">
        Clique aqui para voltar para a lista
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="p-mt-4">
        <div className="flex flex-column gap-2">
          <label htmlFor="name">Nome</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputText
                id="name"
                {...field}
                className={errors.name ? "p-invalid" : ""}
              />
            )}
          />
          {errors.name && (
            <Message severity="error" text={errors.name.message} />
          )}
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputText
                type="email"
                id="email"
                {...field}
                className={errors.email ? "p-invalid" : ""}
              />
            )}
          />
          {errors.email && (
            <Message severity="error" text={errors.email.message} />
          )}
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="password">Senha</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Password
                id="password"
                {...field}
                feedback={false}
                toggleMask
                className={errors.password ? "p-invalid" : ""}
              />
            )}
          />
          {errors.password && (
            <Message severity="error" text={errors.password.message} />
          )}
        </div>

        <div className="flex flex-column gap-2">
          <label htmlFor="telephone">Telefone</label>
          <Controller
            name="telephone"
            control={control}
            render={({ field }) => (
              <InputMask
                id="telephone"
                {...field}
                mask="(99)99999-9999"
                className={errors.telephone ? "p-invalid" : ""}
              />
            )}
          />
          {errors.telephone && (
            <Message severity="error" text={errors.telephone.message} />
          )}
        </div>

        <div className="p-field-checkbox">
          <Controller
            name="knowReact"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Checkbox
                inputId="knowReact"
                onChange={onChange}
                onBlur={onBlur}
                checked={value}
                inputRef={ref}
              />
            )}
          />
          <label htmlFor="knowReact">Você conhece React?</label>
          {errors.knowReact && (
            <Message severity="error" text={errors.knowReact.message} />
          )}
        </div>

        <div className="flex flex-column gap-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-column p-fieldset m-2 p-2">
              <label htmlFor={`referer.${index}.name`}>
                Nome da Referência
              </label>
              <Controller
                name={`referer.${index}.name`}
                control={control}
                render={({ field }) => (
                  <InputText
                    id={`referer.${index}.name`}
                    {...field}
                    className={errors.referer?.[index]?.name ? "p-invalid" : ""}
                  />
                )}
              />
              {errors.referer?.[index]?.name && (
                <Message
                  severity="error"
                  text={errors.referer[index]?.name?.message}
                />
              )}

              <label htmlFor={`referer.${index}.telephone`}>
                Telefone da Referência
              </label>
              <Controller
                name={`referer.${index}.telephone`}
                control={control}
                render={({ field }) => (
                  <InputMask
                    id={`referer.${index}.telephone`}
                    {...field}
                    mask="(99)99999-9999"
                    className={
                      errors.referer?.[index]?.telephone ? "p-invalid" : ""
                    }
                  />
                )}
              />
              {errors.referer?.[index]?.telephone && (
                <Message
                  severity="error"
                  text={errors.referer[index]?.telephone?.message}
                />
              )}

              <Button
                type="button"
                label="Remover Referência"
                className="p-button-danger"
                onClick={() => remove(index)}
              />
            </div>
          ))}
          <Button
            type="button"
            label="Adicionar Referência"
            onClick={() =>
              append({ id: fields.length, name: "", telephone: "" })
            }
          />
        </div>

        <Button type="submit" label="Enviar" className="p-mt-4" />
      </form>
    </Card>
  );
};

export default RegistrationForm;
