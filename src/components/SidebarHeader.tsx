import styled from '@emotion/styled';
import DarkModeToggle from './DarkModeToggle';
import Logo from './Logo';
import Oktocat from '@/assets/oktocat.svg';
import LinkedIn from '@/assets/linkedin.svg';
// import Crown from '@/assets/crown.svg';
import CustomLink from './CustomLink';

const SidebarHeader = () => {
  return (
    <Wrapper>
      <Logo />
      <IconWrapper>
        <DarkModeToggle />
        {/* <PrivatePageLink to="/til">
          <CrownIcon />
        </PrivatePageLink> */}
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

// const PrivatePageLink = styled(CustomLink)(() => ({
//   cursor: 'pointer',
// }));

// const CrownIcon = styled(Crown)(() => ({
//   width: '22px',
//   height: '22px',
// }));

const GithubLink = styled(CustomLink)(() => ({
  cursor: 'pointer',
}));

const LinkedInLink = styled(CustomLink)(() => ({
  cursor: 'pointer',
}));

const LinkedInIcon = styled(LinkedIn)(() => ({
  width: '22px',
  height: '22px',
}));

const OktocatIcon = styled(Oktocat)(() => ({
  width: '22px',
  height: '22px',
}));

const IconWrapper = styled('div')(() => ({
  display: 'none',
  justifyContent: 'space-between',
  width: '90px',

  '@media only screen and (min-width: 961px)': {
    display: 'flex',
  },
}));
