/* src/layouts/Main/SideBar/SideBar.jsx */
/* React */
import React from 'react';
import PropTypes from 'prop-types';

/* Styled */
import styled from 'styled-components';

/* Sub Components */
import SideBarNav from './SideBarNav/SideBarNav';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';

/* Styled Components */
const Container = styled.div`
  position: fixed;
  left: 0;
  height: 100%;
  width: 240px;
  background-color: lightgreen;
`;

/* Constant Variables */
const items = [
  { label: '공지사항', href: '/board' },
  {
    label: '주정차 의견진술',
    href: '/home',
    children: [
      {
        label: '주정차 의견진술 심의목록',
        href: ''
      },
      { label: '주정차 의견진술 심의등록', href: '' }
    ]
  },
  { label: '거주자 의견진술', href: '' },
  { label: '장애인 의견진술', href: '' },
  { label: '사용자 관리', href: '' },
  { label: 'SMS 관리', href: '' },
  { label: '게시판 관리', href: '' }
];

//const it1 = [];

/* Main Compoent */
const SideBar = (props) => {
  /* Props */
  //const {className} = props;

  /* Renderer */
  return (
    <Container className={props.className}>
      <SideBarNav items={items} />
    </Container>
  );
};

/* Main Component Settings */
SideBar.propTypes = {
  className: PropTypes.string
};

/* Exports */
export default SideBar;
