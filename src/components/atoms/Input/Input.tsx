import React from 'react';
import * as S from './style';

export interface Props {
  inputName: string;
  invalid?: boolean;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocusOut?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

function Input({inputName, ...props}: Props): React.ReactElement {
  return <S.Input name={inputName} {...props} autoComplete="off" />;
}

export default Input;
