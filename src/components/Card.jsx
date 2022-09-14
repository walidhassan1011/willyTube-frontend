import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
const Container = styled.div`
  width: ${({ type }) => type !== "sm" && "360px"};
  margin-bottom: ${({ type }) => (type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${({ type }) => type === "sm" && "flex"};
  gap: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: ${({ type }) => (type === "sm" ? "120px" : "202px")};
  background-color: #999;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${({ type }) => type !== "sm" && "16px"};
  gap: 12px;
`;
const ChannelImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: ${({ type }) => type === "sm" && "none"};
  background-color: #999;
`;
const Texts = styled.div``;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
function Card({ type, video }) {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const getChannel = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/users/find/${video.userId}`
        );
        setChannel(data);
      } catch (err) {
        console.log(err);
      }
    };
    getChannel();
  }, [video.userId]);
  console.log(channel);
  return (
    <Link
      to={`/video/${video._id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Container type={type}>
        <Img type={type} src={video?.imgUrl} />
        <Details type={type}>
          <ChannelImg type={type} src={channel?.img} />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video?.views} views • {format(video?.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
