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
import { useState } from "react";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const onUsernameChange = (e) => {
    setUsernameError("");
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(username === "") {
      setUsernameError("Not empty plz");
    };
    if(username.length < 10) {
      setUsernameError("too short");
    };
  };

  return(
      <AuthLayout>
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form onSubmit={handleSubmit}>
            <Input onChange={onUsernameChange} value={username} type="text" placeholder="Username" />
            <Input type="password" placeholder="Password" />
            <Button type="submit" value="Log in" disabled={username === "" && username.length < 10} />
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