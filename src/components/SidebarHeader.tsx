import styled from '@emotion/styled';
import DarkModeToggle from './DarkModeToggle';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import Logo from './Logo';

const SidebarHeader = () => {
  const { isUnder960px } = useResponsiveWeb();

  return (
    <Wrapper>
      <Logo />
      {!isUnder960px && <DarkModeToggle />}
    </Wrapper>
  );
};

export default SidebarHeader;

const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.6rem',
  width: '100%',
}));
