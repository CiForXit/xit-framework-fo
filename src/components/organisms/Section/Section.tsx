/* src/layouts/Main/Section/Section.jsx */
/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Styled Components */
const Container = styled.div`
  height: 700px;
  width: 100%;
`;
const Wrapper = styled.div`
  height: 100%;
`;

/* Main Compoent */
const Section = (props) => {
  /* Props */
  //const {className, children} = props;
  console.log(props);
  /* Renderer */
  return (
    <Container className={props.className}>
      <Wrapper>{props.children}</Wrapper>
    </Container>
  );
};

/* Main Component Settings */
Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

/* Exports */
export default Section;
