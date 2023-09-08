import styled from '@emotion/styled';
import CustomLink from './CustomLink';
import DarkModeToggle from './DarkModeToggle';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';

const SidebarHeader = () => {
  const { isUnder960px } = useResponsiveWeb();

  return (
    <Wrapper>
      <NameWrapper>
        <Name to="/">녕후킴</Name>
      </NameWrapper>
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

const Name = styled(CustomLink)(({ theme }) => ({
  ...theme.typography.h1,
  fontWeight: 'bold',
}));

const NameWrapper = styled('div')(() => ({
  fontSize: '1.8rem',
}));
