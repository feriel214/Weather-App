import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";

// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import SignupForm from "src/sections/auth/login/SignupForm";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  const mdUp = useResponsive("up", "md");
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/", { replace: true });
  };
  return (
    <>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <img
              src="/assets/illustrations/yup.avif"
              width="100%"
              height="100%"
              alt="login"
            />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Register Account
            </Typography>

            <SignupForm />
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              sx={{ my: 1 }}
            >
              <Link variant="subtitle2" underline="hover">
                <span onClick={handleSignIn}>you already have an account </span>
              </Link>
            </Stack>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
