import { css } from '@emotion/react';
import PretendardBold from '@/assets/Pretendard-Bold.woff';
import PretendardExtraBold from '@/assets/Pretendard-ExtraBold.woff';
import PretendardMedium from '@/assets/Pretendard-Medium.woff';

export const pretendardExtraBold = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardExtraBold}) format('woff');
    font-weight: 700;
  }
`;

export const pretendardBold = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardBold}) format('woff');
    font-weight: 600;
  }
`;

export const pretendardMedium = css`
  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardMedium}) format('woff');
    font-weight: 500;
  }
`;
