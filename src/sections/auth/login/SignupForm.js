import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
import axios from "axios";

import Iconify from "../../../components/iconify";

export default function SignupForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Tunisia");
  const [error, setError] = useState(false);
  const handleClick = () => {
    axios
      .post("http://localhost:5000/signup", {
        username: email,
        password: password,
      })
      .then((response) =>
      {localStorage.setItem("user" , email);
      localStorage.setItem("country", country )
        navigate("/dashboard/app", { state: { userCountry: country } })}
      )
      .catch((error) => {
        setError(true);
        setOpen(true);
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="country"
          label="Country"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      </Stack>
      <Stack sx={{ my: 3 }}>
        <LoadingButton
          fullWidth
          size="20px"
          type="submit"
          variant="contained"
          onClick={handleClick}
          style={{ "background-color": "#ffbc01" }}
        >
          Sign Up
        </LoadingButton>
      </Stack>

      {error && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MuiAlert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Alerady exist !
            </MuiAlert>
          </Snackbar>
        </>
      )}

      {!error && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Account Sucessfully created !
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}
