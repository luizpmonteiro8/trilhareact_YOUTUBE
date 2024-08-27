import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
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
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {consumerId ? "Editar Cliente" : "Novo Cliente"}
          </CardTitle>
          <Link
            to="/"
            className="text-sm text-blue-500 hover:underline flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar para a lista
          </Link>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input type="email" {...field} />}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <Input type="password" {...field} />}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Telefone</Label>
              <Controller
                name="telephone"
                control={control}
                render={({ field }) => (
                  <InputMask
                    {...field}
                    mask="(99)99999-9999"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                )}
              />
              {errors.telephone && (
                <p className="text-sm text-red-500">
                  {errors.telephone.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Controller
                name="knowReact"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="knowReact"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label htmlFor="knowReact">Você conhece React?</Label>
            </div>

            <div className="space-y-4">
              <Label>Referências</Label>
              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`referer.${index}.name`}>
                          Nome da Referência
                        </Label>
                        <Controller
                          name={`referer.${index}.name`}
                          control={control}
                          render={({ field }) => <Input {...field} />}
                        />
                        {errors.referer?.[index]?.name && (
                          <p className="text-sm text-red-500">
                            {errors.referer[index]?.name?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`referer.${index}.telephone`}>
                          Telefone da Referência
                        </Label>
                        <Controller
                          name={`referer.${index}.telephone`}
                          control={control}
                          render={({ field }) => (
                            <InputMask
                              {...field}
                              mask="(99)99999-9999"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          )}
                        />
                        {errors.referer?.[index]?.telephone && (
                          <p className="text-sm text-red-500">
                            {errors.referer[index]?.telephone?.message}
                          </p>
                        )}
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover Referência
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ id: fields.length, name: "", telephone: "" })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Referência
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
