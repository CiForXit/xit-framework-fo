/* src/layouts/Main/Main.jsx */
/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled, {createGlobalStyle} from 'styled-components';

/* Sub Components */
import Header from '../../components/organisms/Header/Header';
import Footer from '../../components/organisms/Footer';
import SideBar from '../../components/organisms/SideBar/SideBar';
import Section from '../../components/organisms/Section/Section';

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

/* Main Compoent */
const Main = (props) => {
  /* Props */
  const {className, children} = props;

  /* Renderer */
  return (
    <Container className={className}>
      <GlobalStyle />
      <Header />
      <SideBar />
      <Section>{children}</Section>
      <Footer />
    </Container>
  );
};

/* Main Component Settings */
Main.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

/* Exports */
export default Main;
