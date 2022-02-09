import React, {useContext} from 'react';

import * as S from './style';
import {Btn} from 'components';
import logo from 'assets/img/logo.svg';
import ROUTES from 'commons/constants/routes';
import {OPST_OPEN} from 'commons/constants/string';

import {UserAccountState} from 'stores/accountStore';

function Header(): React.ReactElement {
  //const account = useContext(UserAccountState);

  return <div>ddkkdk</div>;
  /*<S. Container>
      <Btn fit styletype={'transparent'} children={OPST_OPEN} to={ROUTES.EVENT_CREATE} data-testid={'header-create'} />
      <S.LogoBtn to={ROUTES.HOME} alt={'Logo'} src={logo} data-testid={'header-home'} />
      <Btn
        fit
        styletype={'transparent-border'}
        children={!account.isLogin ? '로그인' : `${account.lastName}${account.firstName}`}
        to={account.isLogin ? ROUTES.MYPAGE_TICKETS : ROUTES.LOGIN}
        data-testid={'header-account'}
      />
    </S.Container>*/
}

export default Header;
