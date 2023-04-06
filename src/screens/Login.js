/* eslint-disable */
import styled from "styled-components";
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import routes from "./Routes";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import Seperator from "../components/auth/Seperator";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { getVariableValues, validate } from "graphql";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const { register, handleSubmit, formState, getValues, setError, clearErrors} = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    const {login: {ok, error, token}} = data;
    if(!ok) {
      setError("result", {
        message: error,
      });
    }
    if(token) {
      logUserIn(token);
    }
  };
  const [login, {loading}] = useMutation(LOGIN_MUTATION, {
    onCompleted, 
  });
  const onSubmitValid = (data) => {
    if(loading) {
      return;
    }
    const {userName, password} = getValues();
    login({
      variables: {
        userName, password
      }
    })
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return(
      <AuthLayout>
        <PageTitle title="Login" />
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input {...register("userName", {required: "Username is required.", minLength: {value: 5, message: "Username should be longer than 5 letters."}})} name="userName" type="text" hasError={Boolean(formState.errors?.username?.message)} onChange={clearLoginError} placeholder="userName" />
            <FormError message={formState.errors?.username?.message} />
            <Input {...register("password", {required: "Password is required."})} name="password" type="password" hasError={Boolean(formState.errors?.password?.message)} placeholder="Password" />
            <FormError message={formState.errors?.result?.message} />
            <Button type="submit" value={loading ? "Loading..." : "Log in"} disabled={!formState.isValid || loading} />
          </form>
          <Seperator />
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} />
            <span>Log in with Facebook</span>
          </FacebookLogin>
        </FormBox>
        <BottomBox cta="Don't have an account?" linkText="Sign up" link={routes.SignUp} />
      </AuthLayout>
  )
};

export default Login;