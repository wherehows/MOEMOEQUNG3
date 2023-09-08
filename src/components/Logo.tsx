import styled from '@emotion/styled';
import CustomLink from './CustomLink';

const Logo = () => {
  return (
    <NameWrapper>
      <Name to="/">녕후킴</Name>
    </NameWrapper>
  );
};

export default Logo;

const Name = styled(CustomLink)(({ theme }) => ({
  ...theme.typography.h1,
  fontWeight: 'bold',
}));

const NameWrapper = styled('div')(() => ({
  fontSize: '1.8rem',
}));
