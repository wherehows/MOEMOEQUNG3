import { Global, css } from '@emotion/react';
import GlobalFont from '../fonts/GlobalFont';

const ResetCSS = () => {
  return (
    <Global
      styles={css`
        ${GlobalFont}

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body {
          height: 100%;
          font-family: 'Noto Sans KR', sans-serif;
        }

        body {
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
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
      `}
    />
  );
};

export default ResetCSS;
