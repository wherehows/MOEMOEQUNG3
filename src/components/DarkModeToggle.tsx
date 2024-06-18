import styled from '@emotion/styled';
import Sun from '@/assets/sun.svg';
import Moon from '@/assets/moon.svg';
import { ChangeEvent, useEffect, useState } from 'react';
import useIsMounted from '@/hooks/useIsMounted';
import { isInClient } from '@/utils/helpers';

const DarkModeToggle = () => {
  const isMounted = useIsMounted();

  const [isOn, setIsOn] = useState(() => {
    if (!isInClient()) {
      return false;
    }

    return window.__theme === 'dark' ? true : false;
  });

  const handleClickCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const mode = e.target.checked ? 'dark' : 'light';
    setIsOn(e.target.checked);

    try {
      window.localStorage.setItem('preferred-theme', mode);
    } catch {
      console.error('다크, 라이트 모드 정보를 스토리지에 저장할 수 없습니다.');
    }

    document.documentElement.setAttribute('data-preferred-theme', mode);
  };

  return (
    <Wrapper>
      <ToggleBody
        type="checkbox"
        checked={isOn}
        onChange={handleClickCheckBox}
      />
      {isMounted ? isOn ? <MoonIcon /> : <SunIcon /> : <></>}
    </Wrapper>
  );
};

const Wrapper = styled('label')(() => ({
  cursor: 'pointer',
}));

const ToggleBody = styled('input')(() => ({
  WebkitAppearance: 'none',
  display: 'none',
}));

const SunIcon = styled(Sun)(() => ({
  width: '22px',
  height: '22px',
}));

const MoonIcon = styled(Moon)(() => ({
  width: '22px',
  height: '22px',
  color: '#ffffff',
}));

export default DarkModeToggle;
