import styled from '@emotion/styled';
import DarkModeToggle from './DarkModeToggle';
import NavigationCollapseToggle from './NavigationCollapseToggle';
import { Dispatch } from 'react';
import Logo from './Logo';
import Oktocat from '@/assets/oktocat.svg';
import LinkedIn from '@/assets/linkedin.svg';
import CustomLink from './CustomLink';

interface HeaderProps {
  isDetailPage?: boolean;
  isSidebarShown: boolean;
  setIsSidebarShown: Dispatch<boolean>;
}

const Header = ({
  isDetailPage,
  isSidebarShown,
  setIsSidebarShown,
}: HeaderProps) => {
  return (
    <Wrapper>
      <Logo isDetailPage={isDetailPage} />
      <ListWrapper>
        <List>
          <DarkModeToggle />
        </List>
        <List>
          <GithubLink to="https://github.com/wherehows">
            <OktocatIcon />
          </GithubLink>
        </List>
        <List>
          <LinkedInLink to="https://github.com/wherehows">
            <LinkedInIcon />
          </LinkedInLink>
        </List>
        <List>
          <NavigationCollapseToggle
            isSidebarShown={isSidebarShown}
            setIsSidebarShown={setIsSidebarShown}
          />
        </List>
      </ListWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled('header')(() => ({
  width: '100%',
  padding: '0 12px',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@media only screen and (max-width: 960px)': {
    display: 'flex',
  },
}));

const ListWrapper = styled('ul')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 0,
  margin: 0,
}));

const List = styled('li')(() => ({
  listStyle: 'none',
  marginLeft: '16px',
}));

const GithubLink = styled(CustomLink)(() => ({
  cursor: 'pointer',
}));

const OktocatIcon = styled(Oktocat)(() => ({
  width: '22px',
  height: '22px',
}));

const LinkedInLink = styled(CustomLink)(() => ({
  cursor: 'pointer',
}));

const LinkedInIcon = styled(LinkedIn)(() => ({
  width: '22px',
  height: '22px',
}));
