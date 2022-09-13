import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login, loginFailed, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 50px;
  border: 1px solid ${({ theme }) => theme.soft};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;
const Links = styled.div`
  margin-left: 50px;
`;
const Link = styled.span`
  margin-left: 30px;
`;

function Signin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login());
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/signin",
        {
          name,
          password,
        }
      );

      dispatch(loginSuccess(data));
    } catch (err) {
      dispatch(loginFailed());
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>To continue to willyTube</SubTitle>
        <Input
          placeholder="username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>OR</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Title>OR</Title>
        <Input
          placeholder="username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(UsA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}

export default Signin;
