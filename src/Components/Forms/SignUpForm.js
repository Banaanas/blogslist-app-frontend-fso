import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { Field, Form, Formik } from "formik";
import { object, ref, string } from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import displayToast from "../../utils/displayToast";
import signUp from "../../services/signup";
import displayServerErrorToast from "../../utils/displayServerErrorToast";
import userLogin from "../../utils/userLogin";

// Form
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20rem;
  margin-top: 1rem;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  border-radius: 10px;
  box-shadow: -3px 0 10px 0 ${({ theme }) => theme.colors.primary.dark};

  label {
    margin-bottom: -0.3rem;
    font-weight: bold;
    font-size: 1.5rem;
  }

  input {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;

    &::placeholder {
      color: grey;
      font-style: italic;
    }
  }
`;

// Form Validation Schema - Yup
const ValidationSchemaYup = object().shape({
  name: string()
    .min(5, "Name must be at least 5 characters long")
    .max(20, "Name can't exceed 20 characters")
    .required("Name is Required"),
  username: string()
    .min(5, "Username must be at least 5 characters long")
    .max(15, "Username can't exceed 15 characters")
    .required("Username is Required"),
  password: string()
    .min(5, "Password must be at least 5 characters long")
    .max(15, "Password can't exceed 10 characters")
    .required("Password is Required"),
  passwordConfirmation: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Enter Blog's URL"),
});

const SignUpForm = () => {
  // USEHISTORY - REACT ROUTER
  const history = useHistory();

  // SIGNUP - FUNCTION
  const handleSignUp = async (newUser) => {
    try {
      // Sign Up User - Async Function
      await signUp(newUser);

      // Login User - Async Function
      await userLogin(newUser.username, newUser.password);

      // Display Success Toast
      displayToast(
        "🌠 Account Created ✨",
        "You successfully created your Account.",
        "success",
      );
      // Redirect to MyProfilePage
      history.push("/my-profile");
    } catch (e) {
      // Display Warning Toast - Username has to be unique
      const errorWords = "expected `username` to be unique";

      // Check if 1 - e.response.data.error; 2 - e.response.data.error includes(errorWords)
      if (e.response.data.error && e.response.data.error.includes(errorWords)) {
        displayToast(
          "Username not available",
          "Please, chose another Username.",
          "warning",
        );
      } else {
        // Display Generic Server Error Toast
        displayServerErrorToast();
      }
    }
  };

  const formikInitialValues = {
    name: "Name10",
    username: "Username",
    password: "password",
    passwordConfirmation: "password",
  };

  return (
    /* By default Formik validates after Change, Blur and Submit events */
    <Formik
      initialValues={formikInitialValues}
      validationSchema={ValidationSchemaYup}
      validateOnMount /* Boolean - Run (also) validation when Formik Component mounts - This way, Submit is disabled on mount */
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleSignUp(values);
        setSubmitting(false); // Set Submitting to false - Submit Chakra UI Button (isLoading)
        resetForm(formikInitialValues); // Reset Form Initial Values
      }}
    >
      {({ isValid, errors, touched, isSubmitting }) => (
        <StyledForm>
          <Field name="name">
            {({ field }) => (
              <FormControl isInvalid={errors.name && touched.name}>
                <FormLabel htmlFor="name" fontSize="2rem">
                  Name
                </FormLabel>
                <Input
                  {...field}
                  id="name"
                  placeholder="John Doe"
                  size="lg"
                  bg="secondary.light"
                />
                {/* If this field has been touched, and it contains an error,
                display it */}
                {errors.name && touched.name ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.name}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            )}
          </Field>
          <Field name="username">
            {({ field }) => (
              <FormControl isInvalid={errors.username && touched.username}>
                <FormLabel htmlFor="username" fontSize="2rem">
                  Username
                </FormLabel>
                <Input
                  {...field}
                  id="username"
                  placeholder="JohnDoe"
                  size="lg"
                  bg="secondary.light"
                />
                {/* If this field has been touched, and it contains an error,
                display it */}
                {errors.username && touched.username ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.username}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            )}
          </Field>

          <Field name="password">
            {({ field }) => (
              <FormControl
                height
                isInvalid={errors.password && touched.password}
              >
                <FormLabel htmlFor="password" fontSize="2rem">
                  Password
                </FormLabel>
                <FormHelperText>Chose your Password</FormHelperText>

                <Input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="password"
                  size="lg"
                  bg="secondary.light"
                />

                {errors.password && touched.password ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.password}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            )}
          </Field>
          <Field name="passwordConfirmation">
            {({ field }) => (
              <FormControl
                isInvalid={
                  errors.passwordConfirmation && touched.passwordConfirmation
                }
              >
                <FormHelperText>Confirm your Password</FormHelperText>

                <Input
                  {...field}
                  type="password"
                  id="passwordConfirmation"
                  placeholder="https://www.fleursdumal.fr"
                  size="lg"
                  bg="secondary.light"
                />

                {errors.passwordConfirmation && touched.passwordConfirmation ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.passwordConfirmation}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            )}
          </Field>
          <Button
            type="submit"
            size="xl"
            mt={10}
            py={2}
            width="full"
            bg="primary.dark"
            color="secondary.dark"
            isLoading={isSubmitting}
          >
            SIGN UP
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default SignUpForm;
