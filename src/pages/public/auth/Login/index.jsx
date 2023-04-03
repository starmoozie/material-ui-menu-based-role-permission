import React, { lazy } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../../../../_hooks/auth";
// import { fetchData } from '../../../_utils/helpers';

export const schema = yup
  .object({
    email: yup.string().email().required().max(50).default(""),
    password: yup.string().required().default("")
  })
  .required();

const TextField = lazy(
  async () => await import("../../../../components/fields/Text/index.jsx")
);
const PasswordField = lazy(
  async () => await import("../../../../components/fields/Password/index.jsx")
);

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors }
    // setError
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const from = location.pathname;
  const title = from.replace("/", "");

  const submit = async (body) => {
    // console.log(body);
    login("token", () => {
      navigate(from, { replace: true });
    });
    // await fetchData('/login', 'POST', body)
    // .then((response) => {
    //     if (response.success) {
    //         login(response.data.token, () => {
    //             navigate(from, { replace: true });
    //         });
    //     } else {
    //         setError('email', {
    //             type: 'server',
    //             message: response.message,
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
        align={"center"}
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ marginTop: 2 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {title}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link variant="body2" component={RouterLink} to={`/register`}>
              {"Don't have an account? Register"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
