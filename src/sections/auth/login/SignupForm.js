import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import axios from "axios";
// components
import Iconify from "../../../components/iconify";

// ----------------------------------------------------------------------

export default function SignupForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    axios
      .post("http://localhost:5000/signup", {
        username: email,
        password: password,
      })
      .then((response) => navigate("/dashboard", { replace: true }))
      .catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
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
    </>
  );
}
