import React from 'react';
import * as S from './style';
import {Btn} from 'components';
import {OPST_OPEN} from 'commons/constants/string';
import ROUTES from 'commons/constants/routes';

interface Props {
  imgSrc?: string;
}

function MainBanner({
  imgSrc = 'https://sprint.kr.object.ncloudstorage.com/tempimages/main-banner-1'
}: Props): React.ReactElement {
  return (
    <S.Wrapper imgSrc={imgSrc}>
      <S.Container>
        <S.Title>
          이벤트를 만나는
          <br />
          가장 쉬운 방법
        </S.Title>
        <Btn styletype="primary" to={ROUTES.EVENT_CREATE} children={OPST_OPEN} data-testid={'mainbanner-btn'} />
      </S.Container>
    </S.Wrapper>
  );
}

export default MainBanner;
