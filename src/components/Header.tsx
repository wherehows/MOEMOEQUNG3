import styled from '@emotion/styled';
import Typography from './Typography';
import DarkModeToggle from './DarkModeToggle';
import NavigationToggle from './NavigationToggle';
import { Dispatch } from 'react';

interface HeaderProps {
  isSidebarShown: boolean;
  setIsSidebarShown: Dispatch<boolean>;
}

const Header = ({ isSidebarShown, setIsSidebarShown }: HeaderProps) => {
  return (
    <Wrapper>
      <Typography variant="h1">
        녕후킴의 프론트 엔드 개발 및 관심사 기록 블로그
      </Typography>
      <ListWrapper>
        <List>
          <DarkModeToggle />
        </List>
        <List>
          <NavigationToggle
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
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
