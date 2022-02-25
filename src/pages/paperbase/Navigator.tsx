import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import PermMediaOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActual';
import PublicIcon from '@mui/icons-material/Public';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import { NavLink } from 'react-router-dom';

const categories = [
  { id: '공지사항', children: [{ id: '공지사항', icon: <DnsRoundedIcon />, href: '/board', active: true }] },
  {
    id: '주정차 의견진술',
    children: [
      {
        id: '주정차 의견진술 심의목록',
        icon: <PeopleIcon />,
        href: '/',
        active: true
      },
      { id: '주정차 의견진술 심의등록', icon: <DnsRoundedIcon />, href: '' }
    ]
  },
  {
    id: '거주자 의견진술',
    children: [
      {
        id: '거주자 의견진술 자료관리',
        icon: <PeopleIcon />,
        href: '/board1',
        active: false
      },
      { id: '거주자 의견진술 심의목록', icon: <DnsRoundedIcon />, href: '/login' },
      { id: '거주자 의견진술 심의등록', icon: <DnsRoundedIcon />, href: '/login' }
    ]
  },
  {
    id: '장애인 의견진술',
    children: [
      {
        id: '장애인 의견진술 자료관리',
        icon: <PeopleIcon />,
        href: '/login',
        active: false
      },
      { id: '장애인 의견진술 심의목록', icon: <DnsRoundedIcon />, href: '/login' },
      { id: '장애인 의견진술 심의등록', icon: <DnsRoundedIcon />, href: '/login' }
    ]
  },
  {
    id: '사용자 관리',
    children: [
      {
        id: '사용자 관리',
        icon: <PeopleIcon />,
        href: '/login',
        active: false
      },
      { id: '심사위원 평가', icon: <PeopleIcon />, href: '/login' }
    ]
  },
  {
    id: 'SMS 관리',
    children: [
      {
        id: 'SMS 관리',
        icon: <PeopleIcon />,
        href: '/login',
        active: false
      }
    ]
  },
  {
    id: '게시판 관리',
    children: [
      {
        id: '게시판 관리',
        icon: <PeopleIcon />,
        href: '/login',
        active: false
      }
    ]
  }
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)'
  }
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1,
  px: 2
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          이의신청관리
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 1, px: 2 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, href, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  {/*<ListItemText>{childId}</ListItemText>*/}
                  <NavLink to={href}>
                    <ListItemText>{childId}</ListItemText>
                  </NavLink>
                </ListItemButton>
              </ListItem>
            ))}
            {/*<Divider sx={{mt: 2}} />*/}
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
