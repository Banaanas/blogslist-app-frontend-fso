import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { Formik, Form, Field } from "formik";
import { object, string } from "yup";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { getBlogsAllUsers } from "../../store/slices/blogsAllUsersSlice";
import { addBlogSingleUser } from "../../store/slices/blogsSingleUserSlice";

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
    font-weight: bold;
    font-size: 1.5rem;
  }

  input {
    font-size: 1.2rem;
    
    &::placeholder {
      color: grey;
      font-style: italic;
    }
  }
`;

// Form Validation Schema - Yup
const ValidationSchemaYup = object().shape({
  title: string()
    .min(5, "Title must be at least 3 characters long")
    .max(20, "Title can't exceed 20 characters")
    .required("Enter Blog's Title"),
  author: string()
    .min(5, "Author must be at least 3 characters long")
    .max(10, "Author can't exceed 10 characters")
    .required("Enter Blog's Author"),
  url: string()
    .url("URL must be a valid URL")
    .min(3, "URL must be at least 3 characters long")
    .max(50, "URL must be less than 50 characters long")
    .required("Enter Blog's URL"),
});

const AddBlogForm = () => {
  // USEDISPATCH - REDUX STATE
  const dispatch = useDispatch();

  // USEHISTORY - REACT ROUTER
  const history = useHistory();

  // ADD BLOG - FUNCTION
  const handleAddBlog = (newBlogObject) => {
    // Add Blog - Dispatch - Redux State
    dispatch(addBlogSingleUser(newBlogObject));

    // Get blogsAllUsers - Dispatch - Redux State
    dispatch(getBlogsAllUsers());
  };

  const formikInitialValues = {
    title: "Une Saison en Enfer",
    author: "Rimbaud",
    url: "https://saisonenenfer.fr",
  };

  return (
    /* By default Formik validates after Change, Blur and Submit events */
    <Formik
      initialValues={formikInitialValues}
      validationSchema={ValidationSchemaYup}
      validateOnMount /* Boolean - Run (also) validation when Formik component mounts - This way, Submit is disabled on mount */
      onSubmit={(values, { setSubmitting, resetForm }) => {
        handleAddBlog(values);
        setSubmitting(false); // Set Submitting to false - Submit Chakra UI Button (isLoading)
        resetForm(formikInitialValues); // Reset Form Initial Values
        history.push("/");
      }}
    >
      {({ isValid, errors, touched, isSubmitting }) => (
        <StyledForm>
          <Field name="title">
            {({ field }) => (
              <FormControl isInvalid={errors.title && touched.title}>
                <FormLabel htmlFor="title" fontSize="2rem">
                  Title
                </FormLabel>
                <Input
                  {...field}
                  id="title"
                  placeholder="Les Fleurs du Mal"
                  size="lg"
                  bg="secondary.light"
                />
                {/* If this field has been touched, and it contains an error,
                display it */}
                {errors.title && touched.title ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.title}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            )}
          </Field>

          <Field name="author">
            {({ field }) => (
              <FormControl height isInvalid={errors.author && touched.author}>
                <FormLabel htmlFor="author" fontSize="2rem">
                  Author
                </FormLabel>
                <Input
                  {...field}
                  id="author"
                  placeholder="Charles Baudelaire"
                  size="lg"
                  bg="secondary.light"
                />

                {errors.author && touched.author ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.author}
                  </FormErrorMessage>
                ) : null}
              </FormControl>
            )}
          </Field>
          <Field name="url">
            {({ field }) => (
              <FormControl isInvalid={errors.url && touched.url}>
                <FormLabel htmlFor="url" fontSize="2rem">
                  URL
                </FormLabel>
                <Input
                  {...field}
                  id="url"
                  placeholder="https://www.fleursdumal.fr"
                  size="lg"
                  bg="secondary.light"
                />
                {errors.url && touched.url ? (
                  <FormErrorMessage fontSize="1.5rem">
                    {errors.url}
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
            data-cy="login-button"
            disabled={!isValid}
            isLoading={isSubmitting}
          >
            ADD
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export default AddBlogForm;
