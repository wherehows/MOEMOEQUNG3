import styled from '@emotion/styled';
import { SIDEBAR_PURE_WIDTH } from '@utils/const';
import CustomLink from './CustomLink';
import DarkModeToggle from './DarkModeToggle';

const SidebarHeader = () => {
  return (
    <Wrapper>
      <NameWrapper>
        <Name to="/">녕후킴</Name>
      </NameWrapper>
      <DarkModeToggle />
    </Wrapper>
  );
};

export default SidebarHeader;

const Wrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '1.6rem',
  width: SIDEBAR_PURE_WIDTH,
}));

const Name = styled(CustomLink)(() => ({
  fontWeight: 'bold',
}));

const NameWrapper = styled('div')(() => ({
  margin: '0 0 0.4rem 0',
  fontSize: '1.8rem',
}));
