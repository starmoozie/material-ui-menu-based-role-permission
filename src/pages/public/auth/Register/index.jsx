import React, { lazy } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
// import { fetchData } from '../../../_utils/helpers';

const TextField = lazy(
  async () => await import("../../../../components/fields/Text/index.jsx")
);
const PasswordField = lazy(
  async () => await import("../../../../components/fields/Password/index.jsx")
);

export const schema = yup
  .object({
    name: yup.string().required().max(50).default(""),
    email: yup.string().email().required().max(50).default(""),
    password: yup.string().required().default("").min(8),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
  })
  .required();

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
    // setError
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    }
  });

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.pathname;
  const title = from.replace("/", "");

  const submit = async (body) => {
    navigate("/login", { replace: true });
    // await fetchData(from, 'POST', body)
    // .then((response) => {
    //     if (response.success) {
    //         navigate('/login', { replace: true });
    //     } else {
    //         Object.entries(response.errors).forEach(([key, value]) => {
    //             setError(key, {
    //                 type: 'server',
    //                 message: value.join(', ')
    //             });
    //         });
    //     }
    // });
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textTransform: "capitalize" }}
        align="center"
      >
        {title}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(submit)}
        sx={{ mt: 1 }}
      >
        <TextField
          autoFocus
          label={`Name`}
          name={`name`}
          control={control}
          errors={errors}
        />
        <TextField
          label={`Email Address`}
          name={`email`}
          control={control}
          errors={errors}
        />
        <PasswordField
          label={`Password`}
          name={`password`}
          control={control}
          errors={errors}
        />
        <PasswordField
          label={`Password Confirmation`}
          name={`password_confirmation`}
          control={control}
          errors={errors}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
        >
          {title}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link component={RouterLink} variant="body2" to={`/login`}>
              {"Already have an account? Login"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Register;
