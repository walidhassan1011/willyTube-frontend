import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
function Home({ type }) {
  const [videos, setVideos] = useState([]);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/videos/${type}`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setVideos(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideos();
  }, [type]);
  console.log(videos);
  return (
    <Container>
      {videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
}

export default Home;
