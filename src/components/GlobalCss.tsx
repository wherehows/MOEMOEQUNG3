import { Global, css } from '@emotion/react';
import {
  pretendardExtraBold,
  pretendardBold,
  pretendardMedium,
} from '../fonts/Font';

const GlobalCss = () => {
  return (
    <>
      <Global
        styles={css`
          ${globalCss}
          ${resetCss}
        `}
      />
    </>
  );
};

export default GlobalCss;

const globalCss = css`
  ${pretendardExtraBold}
  ${pretendardBold}
  ${pretendardMedium}

  :root {
    --colors-primary: #d58135;
    --colors-secondary: #cf9a12;
  }

  :root .dark {
    --dark-background: #111314;
    --dark-font: #fff;
  }

  :root .light {
    --dark-background: #fff;
    --dark-font: #111314;
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
`;

const resetCss = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    background: var(--dark-background);
    color: var(--dark-font);
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #___gatsby {
    isolation: isolate;
  }
`;
