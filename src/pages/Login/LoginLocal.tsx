import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControl, FormHelperText, Grid, Box, Typography, Container } from '@mui/material/';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, ProviderType, REFRESH_TOKEN_NAME } from '../../types/AuthModel';
import { IApiResponse } from '../../types/ApiModel';
import { ILoginReponse } from '../../apis/AuthService';
import Alert from 'react-s-alert';
import XitCmm from '../../commons/XitCmm';
import ROUTES from '../../commons/constants/routes';
import { IAppProps } from '../../App';

const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700;
  color: #d32f2f;
`;

const Boxs = styled(Box)`
  padding-bottom: 40px;
`;

const Login = ({ authService }: IAppProps) => {
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [paramError, setParamError] = useState(false);
  const navigate = useNavigate();

  const onhandlePost = (data) => {
    const { userId, password } = data;

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
      });
  };

  const handleSubmit = (e) => {
    setParamError(false);
    const data = new FormData(e.currentTarget);
    const joinData: { userId: string | null; password: string | null } = {
      userId: data.get('userId') as string,
      password: data.get('password') as string
    };
    const { userId, password } = joinData;

    // id 유효성 체크
    //const idRegex = /([\w-.]+)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const idRegex = /^[a-z]+[a-z0-9]{3,8}$/g;
    if (!idRegex.test(userId as string)) {
      setIdError('올바른 ID 형식이 아닙니다.');
      setParamError((p) => true);
    } else setIdError('');

    // 비밀번호 유효성 체크
    //const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^*+=-]{3,12}$/;
    if (!passwordRegex.test(password as string)) {
      setPasswordError('숫자+영문자+특수문자로 3자리 이상 입력해주세요!');
      setParamError((p) => true);
    } else setPasswordError('');

    if (!paramError) {
      e.preventDefault();
      onhandlePost(joinData);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Boxs component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  //autoFocus
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
                  label="비밀번호 (숫자+영문자+특수문자 3자리 이상)"
                  error={passwordError !== '' || false}
                />
              </Grid>
              <FormHelperTexts>{passwordError}</FormHelperTexts>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} size="large">
              로그인
            </Button>
          </FormControl>
        </Boxs>
      </Box>
    </Container>
  );
};

export default Login;
