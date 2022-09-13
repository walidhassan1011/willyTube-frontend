import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg}; ;
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;
function App() {
  const [theme, setTheme] = useState(true);
  return (
    <ThemeProvider theme={theme ? darkTheme : lightTheme}>
      <Container>
        <Router>
          <Menu theme={theme} setTheme={setTheme} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="signin" element={<Signin />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
