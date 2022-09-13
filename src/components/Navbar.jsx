import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import styled from "styled-components";
import { SearchOutlined, VideoCallOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  padding: 5px;
  outline: none;
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;

  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function Navbar() {
  const { user } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Search>
          <Input
            type="text"
            placeholder="Search"
            style={{
              color: "#3ea6ff",
            }}
          />
          <SearchOutlined
            sx={{
              color: "#3ea6ff",
            }}
          />
        </Search>
        {user ? (
          <User>
            <VideoCallOutlined />
            <Avatar />
            {user.name}
          </User>
        ) : (
          <Link
            to="/signin"
            style={{
              textDecoration: "none",
            }}
          >
            <Button>
              <AccountCircleOutlinedIcon /> SIGN IN
            </Button>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
}

export default Navbar;
