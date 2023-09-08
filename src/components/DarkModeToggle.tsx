import styled from '@emotion/styled';
import Sun from '@/assets/sun.svg';
import Moon from '@/assets/moon.svg';
import { ChangeEvent, useState } from 'react';
import { css } from '@emotion/react';

const DarkModeToggle = () => {
  if (typeof window === 'undefined') {
    return <></>;
  }

  const [isOn, setIsOn] = useState(window.__theme === 'dark');

  const handleClickCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsOn(isChecked);

    window.__setPreferredTheme(isChecked ? 'dark' : 'light');
  };

  return (
    <Wrapper htmlFor="toggle-input">
      <ToggleBody
        id="toggle-input"
        type="checkbox"
        checked={isOn}
        onChange={handleClickCheckBox}
      />
      {isOn ? <MoonIcon /> : <SunIcon />}
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
  width: '24px',
  height: '24px',
}));

const MoonIcon = styled(Moon)(() => ({
  width: '24px',
  height: '24px',
  color: '#ffffff',
}));

export default DarkModeToggle;
