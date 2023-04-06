import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "src/user-context";
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

// components
import Iconify from "../../../components/iconify";
import axios from "axios";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("Tunisia");
  const user = { name: "John Doe" }; // or get user data from some other source
  const setUser = useContext(UserContext);
  const handleClick = () => {
    console.log("username: ", email, "password:", password);
    axios
      .post("http://localhost:5000/signin", {
        username: email,
        password: password,
      })
      .then((response) => {
        console.log("response", response.data);

        setUser(user);
        // navigate("/dashboard", { state: { loggedUser: email } }); //country by default
        navigate("/dashboard", { state: { userCountry: country } });
      })
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
          size="large"
          type="submit"
          variant="contained"
          style={{ "background-color": "#ffbc01" }}
          onClick={handleClick}
        >
          Login
        </LoadingButton>
      </Stack>
    </>
  );
}
