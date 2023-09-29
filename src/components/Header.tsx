import styled from '@emotion/styled';
import Typography from './Typography';
import DarkModeToggle from './DarkModeToggle';
import NavigationCollapseToggle from './NavigationCollapseToggle';
import { Dispatch } from 'react';
import Logo from './Logo';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';

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
  const { isUnder960px } = useResponsiveWeb();

  const getLeftContent = () => {
    if (!isUnder960px) {
      return <></>;
    }

    if (isDetailPage) {
      return <Logo />;
    }

    return (
      <Typography variant="h1">
        녕후킴의 프론트 엔드 개발 및 관심사 기록 블로그
      </Typography>
    );
  };

  return (
    <Wrapper>
      {getLeftContent()}
      <ListWrapper>
        <List>
          <DarkModeToggle />
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
