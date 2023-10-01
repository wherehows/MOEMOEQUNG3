import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';

export const WriterContent = () => {
  return <Wrapper></Wrapper>;
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
