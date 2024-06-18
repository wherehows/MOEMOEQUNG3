/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
require('firebase/compat/database');
const ClientOnlyVisibleWrapper =
  require('./src/components/ClientOnlyVisibleWrapper').default;

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <script
      dangerouslySetInnerHTML={{
        __html: `
            (function() {
              let preferredTheme = null;

              try {
                preferredTheme = localStorage.getItem('preferred-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
              } catch {
                console.error('다크, 라이트 모드 정보를 가져올 수 없습니다.');
              }
                
              document.documentElement.setAttribute('data-preferred-theme', preferredTheme);
              window.__theme = preferredTheme;
            })();
          `,
      }}
    />,
  ]);
};

export const wrapPageElement = ({ element }) => {
  return <ClientOnlyVisibleWrapper>{element}</ClientOnlyVisibleWrapper>;
};
