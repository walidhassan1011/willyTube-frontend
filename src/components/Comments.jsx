import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          `
        http://localhost:5000/api/comments/${videoId}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setComments(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId]);
  return (
    <Container>
      <NewComment>
        <Avatar src={user.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
