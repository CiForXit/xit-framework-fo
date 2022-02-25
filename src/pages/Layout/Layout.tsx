import React from 'react';
import Header from '../../components/organisms/Header/Header';
import Footer from '../../components/organisms/Footer/Footer';
import SideBar from '../../components/organisms/SideBar/SideBar';
import Section from '../../components/organisms/Section/Section';
import styled, {createGlobalStyle} from 'styled-components';

/* Global Styled */
const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%
  }
	body {
		padding: 0;
    margin: 0;
  }
  #root {
    height: 100%;
  }
`;

/* Styled Components */
const Container = styled.div`
  padding-top: 56px;
  height: 100%;
  padding-left: 240px;
`;

const Layout = (props) => {
  return (
    <Container className={props.className}>
      <Header />
      <SideBar />
      <Section>{props.children}</Section>
      <Footer />
    </Container>
  );
};
export default Layout;
