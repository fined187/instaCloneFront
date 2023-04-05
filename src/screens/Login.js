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
import { validate } from "graphql";
import FormError from "../components/auth/FormError";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  const { register, watch, handleSubmit, formState} = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    console.log(data);
  };

  const onSubmitInValid = (data) => {
    console.log(data);
  };
  
  return(
      <AuthLayout>
        <PageTitle title="Login" />
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input {...register("username", {required: "Username is required.", minLength: {value: 5, message: "Username should be longer than 5 letters."}})} name="username" type="text" hasError={Boolean(formState.errors?.username?.message)} placeholder="Username" />
            <FormError message={formState.errors?.username?.message} />
            <Input {...register("password", {required: "Password is required."})} name="password" type="password" hasError={Boolean(formState.errors?.password?.message)} placeholder="Password" />
            <FormError message={formState.errors?.password?.message} />
            <Button type="submit" value="Log in" disabled={!formState.isValid} />
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