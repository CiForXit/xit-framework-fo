import React, {useState} from 'react';
import axios from 'axios';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material/';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {ACCESS_TOKEN_NAME, ProviderType, REFRESH_TOKEN_NAME} from '../../types/AuthModel';
import {IApiResponse} from '../../types/ApiModel';
import {ILoginReponse} from '../../apis/AuthService';
import Alert from 'react-s-alert';
import XitCmm from '../../commons/XitCmm';
import ROUTES from '../../commons/constants/routes';
import {IAppProps} from '../../App';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px;
`;

const Login = ({authService}: IAppProps) => {
  const theme = createTheme();
  //const [checked, setChecked] = useState(false);
  const [idError, setIdError] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [passwordError, setPasswordError] = useState('');
  //const [nameError, setNameError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  // const handleAgree = (event) => {
  //   setChecked(event.target.checked);
  // };

  const onhandlePost = (data) => {
    const {userId, password} = data;
    const postData = {userId, password};

    authService
      .login({
        providerType: ProviderType.LOCAL,
        picture: '',
        userid: userId,
        token: '', // ?? alert('''')
        passwd: password
      })
      .then((res: IApiResponse<ILoginReponse>) => {
        if (!res.success) {
          return;
        }
        if (res.data) {
          Alert.success(`Success ${userId} log in!`);
          localStorage.setItem(ACCESS_TOKEN_NAME, `${res.data.grantType} ${res.data.accessToken}`);
          XitCmm.setCookie(REFRESH_TOKEN_NAME, res.data.refreshToken);
          navigate(ROUTES.BOARD);
        }
        //navigate(ROUTES.MAIN);
        //navigate(ROUTES.BOARD);
        //this.props.history.push("/");
        //data ? console.log(`data: {}`, data) : '';
      });

    // post
    // await axios
    //   .post('/member/join', postData)
    //   .then(function (response) {
    //     console.log(response, '성공');
    //     history('/login');
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //     setRegisterError('회원가입에 실패하였습니다. 다시한번 확인해 주세요.');
    //   });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const joinData: {userId: string | null; password: string | null} = {
      userId: data.get('userId') as string,
      password: data.get('password') as string
    };
    const {userId, password} = joinData;

    // id 유효성 체크
    //const idRegex = /([\w-.]+)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const idRegex = /^[a-z]+[a-z0-9]{3,8}$/g;
    if (!idRegex.test(userId as string)) setIdError('올바른 ID 형식이 아닙니다.');
    else setIdError('');

    // 비밀번호 유효성 체크
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^*+=-]{3,12}$/;
    if (!passwordRegex.test(password as string)) setPasswordState('숫자+영문자+특수문자로 3자리 이상 입력해주세요!');
    else setPasswordState('');

    if (!idError && !passwordState) {
      onhandlePost(joinData);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}} />
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Boxs component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="text"
                    id="userId"
                    name="userId"
                    label="사용자 ID"
                    error={idError !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{idError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    error={passwordState !== '' || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} size="large">
                로그인
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Boxs>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
