import styled from '@emotion/styled';
import DarkModeToggle from './DarkModeToggle';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import Logo from './Logo';
import Oktocat from '@/assets/oktocat.svg';
import LinkedIn from '@/assets/linkedin.svg';
import CustomLink from './CustomLink';

const SidebarHeader = () => {
  const { isUnder960px } = useResponsiveWeb();

  return (
    <Wrapper>
      <Logo />
      <IconWrapper>
        {!isUnder960px && <DarkModeToggle />}
        <GithubLink to="https://github.com/wherehows">
          <OktocatIcon />
        </GithubLink>
        <LinkedInLink to="https://www.linkedin.com/in/%EC%98%81%ED%9B%84-%EA%B9%80-542165238/">
          <LinkedInIcon />
        </LinkedInLink>
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

const LinkedInLink = styled(CustomLink)(() => ({
  cursor: 'pointer',
}));

const LinkedInIcon = styled(LinkedIn)(() => ({
  width: '24px',
  height: '24px',
}));

const OktocatIcon = styled(Oktocat)(() => ({
  width: '24px',
  height: '24px',
}));

const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100px',
}));
