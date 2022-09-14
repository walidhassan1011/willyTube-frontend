import {
  AddTaskOutlined,
  ReplyOutlined,
  ThumbDown,
  ThumbDownOffAltOutlined,
  ThumbUp,
  ThumbUpOutlined,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import styled from "styled-components";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 20px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  gap: 5px;
  color: ${({ theme }) => theme.text};
  text-transform: uppercase;
`;
const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
`;

const Recommendation = styled.div`
  flex: 2;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;
const Subscribe = styled.button`
  color: "white";
  background-color: "#cc1a00";

  font-weight: 500;
  padding: 10px 20px;
  cursor: pointer;
`;
function Video() {
  const { user } = useSelector((state) => state.user);
  const { video } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  console.log(user.subscribedUsers);
  console.log(channel._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `
        http://localhost:5000/api/videos/find/${path}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        const channelRes = await axios.get(
          `
        http://localhost:5000/api/users/find/${videoRes.data.userId}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);
  const handleLike = async () => {
    try {
      await axios.put(
        ` http://localhost:5000/api/users/like/${video._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(like(user._id));
    } catch (err) {
      console.log(err);
    }
  };
  const handleDislike = async () => {
    try {
      await axios.put(
        ` http://localhost:5000/api/users/dislike/${video._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch(dislike(user._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSub = async () => {
    try {
      if (user.subscribedUsers.includes(channel._id)) {
        console.log("unsub");
        await axios.put(
          ` http://localhost:5000/api/users/unsubscribe/${channel._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      } else {
        console.log("sub");
        await axios.put(
          ` http://localhost:5000/api/users/subscribe/${channel._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      }

      dispatch(subscription(channel._id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="550"
            src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
          <Info>
            {video.views} views • {format(video.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {video.likes?.includes(user._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}
              {video.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {video.dislikes?.includes(user._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOffAltOutlined />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined />
              Share
            </Button>

            <Button>
              <AddTaskOutlined />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={user.img} />
            <ChannelDetails>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>
                {channel.subscribers} {""}subscibers
              </ChannelCounter>
              <Description>{video.description}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <Subscribe
            style={{
              backgroundColor: "#cc1a00",
              color: "white",
              fontWeight: "500",
              borderRadius: "3px",
              border: "none",
              height: "max-content",
            }}
            onClick={handleSub}
          >
            {user.subscribedUsers?.includes(channel._id)
              ? "subscribed"
              : "subscribe"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      <Recommendation>
        {/* <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" /> */}
      </Recommendation>
    </Container>
  );
}

export default Video;
