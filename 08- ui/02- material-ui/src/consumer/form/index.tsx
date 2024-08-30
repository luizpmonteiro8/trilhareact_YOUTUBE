import { zodResolver } from "@hookform/resolvers/zod";
import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
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
    <Container component="main" maxWidth="sm" sx={{ marginTop: 8 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h1" gutterBottom>
          {consumerId ? "Editar Cliente" : "Novo Cliente"}
        </Typography>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="text" color="primary" sx={{ marginBottom: 2 }}>
            Voltar para a lista
          </Button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome"
                  variant="outlined"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Senha"
                  type="password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="telephone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    inputComponent: InputMask as any,
                    inputProps: {
                      mask: "(99)99999-9999",
                    },
                  }}
                  error={!!errors.telephone}
                  helperText={errors.telephone?.message}
                />
              )}
            />
          </Box>

          <Box mb={2}>
            <Controller
              name="knowReact"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Você conhece React?"
                />
              )}
            />
            {errors.knowReact && (
              <Typography color="error">{errors.knowReact.message}</Typography>
            )}
          </Box>

          <Box mb={2}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  padding: 2,
                  border: "1px solid",
                  borderColor: "grey.400",
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <Controller
                  name={`referer.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={`Nome da Referência ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      error={!!errors.referer?.[index]?.name}
                      helperText={errors.referer?.[index]?.name?.message}
                    />
                  )}
                />

                <Box mb={2}>
                  <Controller
                    name={`referer.${index}.telephone`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={`Telefone da Referência ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          inputComponent: InputMask as any,
                          inputProps: {
                            mask: "(99)99999-9999",
                          },
                        }}
                        error={!!errors.referer?.[index]?.telephone}
                        helperText={errors.referer?.[index]?.telephone?.message}
                      />
                    )}
                  />
                </Box>

                <IconButton
                  onClick={() => remove(index)}
                  color="error"
                  aria-label="remove referer"
                >
                  <Delete />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => append({ id: 0, name: "", telephone: "" })}
            >
              Adicionar Referência
            </Button>
          </Box>

          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
