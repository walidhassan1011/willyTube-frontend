import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
function Card({ type }) {
  return (
    <Link
      to={"/video/test"}
      style={{
        textDecoration: "none",
      }}
    >
      <Container type={type}>
        <Img
          type={type}
          src="https://i9.ytimg.com/vi_webp/k3Vfj-e1Ma4/mqdefault.webp?v=6277c159&sqp=CIjm8JUG&rs=AOn4CLDeKmf_vlMC1q9RBEZu-XQApzm6sA"
        />
        <Details type={type}>
          <ChannelImg
            type={type}
            src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
          />
          <Texts>
            <Title>Test Video</Title>
            <ChannelName>Willy dev</ChannelName>
            <Info>66,000 views • 2 years ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
