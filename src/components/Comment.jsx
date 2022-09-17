import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

function Comment({ comment }) {
  const [channel, setChannel] = useState({});
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/find/${comment.userId}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setChannel(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComment();
  }, [comment.userId]);
  return (
    <Container>
      <Avatar src={channel.img} />
      <Details>
        <Name>
          {channel.name} <Date>1 day ago</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
}

export default Comment;
