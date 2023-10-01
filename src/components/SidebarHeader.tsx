import styled from '@emotion/styled';
import DarkModeToggle from './DarkModeToggle';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import Logo from './Logo';
import Oktocat from '@/assets/oktocat.svg';
import CustomLink from './CustomLink';

const SidebarHeader = () => {
  const { isUnder960px } = useResponsiveWeb();

  return (
    <Wrapper>
      <Logo />
      <IconWrapper>
        <GithubLink to="https://github.com/wherehows?tab=repositories">
          <OktocatIcon />
        </GithubLink>
        {!isUnder960px && <DarkModeToggle />}
      </IconWrapper>
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

const GithubLink = styled(CustomLink)(() => ({
  cursor: 'pointer',
}));

const OktocatIcon = styled(Oktocat)(() => ({
  width: '24px',
  height: '24px',
}));

const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '60px',
}));
