import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';
import Typography from './Typography';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { TIL } from '@/types/document';

interface TILContentProps {
  tils: TIL[];
}

export const TILContent = ({ tils }: TILContentProps) => {
  const { isUnder960px } = useResponsiveWeb();
  return (
    <Wrapper>
      {!isUnder960px && (
        <Typography variant="h1">
          프론트엔드 개발 및 관심사를 기록하는 블로그
        </Typography>
      )}
    </Wrapper>
  );
};

const Wrapper = styled('main')(() => ({
  width: MAIN_PURE_WIDTH,
  height: '100%',
  '@media only screen and (max-width: 960px)': {
    margin: '0 auto',
  },
  '@media only screen and (min-width: 961px)': {
    marginLeft: MAIN_LEFT_MARGIN_WIDTH,
  },
}));
