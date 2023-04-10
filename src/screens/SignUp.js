/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Seperator from "../components/auth/Seperator";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import routes from "./Routes";
import styled from "styled-components";
import { FatLink } from "../components/Shared";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String!
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const location = useLocation();
  const history = useHistory();
  const onCompleted = (data) => {
    const {userName, password} = getValues();
    const {
      createAccount: {ok, error},
    } = data;
    if(!ok) {
      return;
    }
    history.push(routes.home, {message: "Account created. Please log in.", userName, password,});
  }
  const [createAccount, {loading}] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  
  const {register, handleSubmit, errors, formState, getValues} = useForm({
    mode: "onChange",
    defaultValues: {
      userName: location?.state?.userName || "",
      password: location?.state?.password || "",
    }
  });

  const onSubmitValue = (data) => {
    if(loading) {
      return;
    } 
    createAccount({
      variables: {
        ...data,
      }}
    );
  };

  return(
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <div>
          <HeaderContainer>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
            <Subtitle>
              Sign up to see photos and videos from your friends.
            </Subtitle>
          </HeaderContainer>
        </div>
        <form onSubmit={handleSubmit(onSubmitValue)}>
          <Input {...register("firstName", {required: "First Name is required."})} name="firstName" type="text" placeholder="First Name" />
          <Input {...register("lastName", {required: "Last Name is required."})} name="lastName" type="text" placeholder="Last Name" />
          <Input {...register("email", {required: "Email is required."})} name="email" type="text" placeholder="Email" />
          <Input {...register("userName", {required: "User Name is required."})} name="userName" type="text" placeholder="Username" />
          <Input {...register("password", {required: "Password is required."})} name="password" type="password" placeholder="Password" />
          <Button type="submit" value={loading ? "Loading..." : "Sign up"} disabled={!formState.isValid || loading} />        
        </form>
        <Seperator />
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;