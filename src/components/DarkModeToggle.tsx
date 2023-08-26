import styled from '@emotion/styled';
import Sun from '@assets/sun.inline.svg';
import Moon from '@assets/moon.inline.svg';
import { ChangeEvent, useState } from 'react';

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
      <Circle isOn={isOn} />
    </Wrapper>
  );
};

const Wrapper = styled('label')(() => ({
  marginRight: '0.5rem',
}));

const ToggleBody = styled('input')(() => ({
  WebkitAppearance: 'none',
  display: 'none',
}));

const Circle = styled('span')<{ isOn: boolean }>(({ isOn }) => ({
  position: 'relative',
  display: 'block',
  width: '60px',
  height: '30px',
  background: isOn ? 'var(--colors-secondary)' : '#eadbdb',
  cursor: 'pointer',
  borderRadius: '20px',
  overflow: 'hidden',
  transition: 'ease-in 0.5s',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: '3px',
    left: '3px',
    backgroundColor: '#fff',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    transition: '0.5s',
    transform: isOn ? 'translateX(0px)' : 'translateX(-60px)',
  },

  '&:after': {
    content: '""',
    position: 'absolute',
    top: '3px',
    left: '3px',
    backgroundColor: '#fff',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    transition: '0.5s',
    transform: isOn ? 'translateX(60px)' : 'translateX(0px)',
  },
}));

export default DarkModeToggle;
