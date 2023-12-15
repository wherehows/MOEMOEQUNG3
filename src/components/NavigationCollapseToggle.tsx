import Hamburger from '@/assets/hamburger.svg';
import styled from '@emotion/styled';
import { ChangeEvent, Dispatch } from 'react';

interface NavigationMenuButtonProps {
  isSidebarShown: boolean;
  setIsSidebarShown: Dispatch<boolean>;
}

const NavigationCollapseToggle = ({
  isSidebarShown,
  setIsSidebarShown,
}: NavigationMenuButtonProps) => {
  const handleClickCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSidebarShown(e.target.checked);
  };

  return (
    <>
      <Wrapper>
        <ToggleBody
          id="navbar-toggle-input"
          type="checkbox"
          checked={isSidebarShown}
          onChange={handleClickCheckBox}
        />
        <Hamburger width="24px" height="24px" />
      </Wrapper>
    </>
  );
};

export default NavigationCollapseToggle;

const Wrapper = styled('label')(() => ({
  cursor: 'pointer',
}));

const ToggleBody = styled('input')(() => ({
  display: 'none',
}));
