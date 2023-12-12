import styled from '@emotion/styled';
import CustomLink from './CustomLink';
import Typography from './Typography';

interface LogoProps {
  isDetailPage?: boolean;
}

const Logo = ({ isDetailPage }: LogoProps) => {
  return (
    <>
      {isDetailPage ? (
        <NameWrapper>
          <Name to="/">녕후킴</Name>
        </NameWrapper>
      ) : (
        <Typography variant="h1">
          <Name to="/">녕후킴</Name>
        </Typography>
      )}
    </>
  );
};

export default Logo;

const Name = styled(CustomLink)(({ theme }) => ({}));

const NameWrapper = styled('div')(({ theme }) => ({
  ...theme.typography.h1,
  fontWeight: 'bold',
}));
