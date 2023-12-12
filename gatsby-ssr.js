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
              function setTheme(theme) {
                if (theme === 'dark') {
                  document.documentElement.className = 'dark';
                } else {
                  document.documentElement.className = 'light';
                }

                window.__theme = theme;
              };

              window.__setPreferredTheme = function(theme) {
                setTheme(theme);
                try {
                  localStorage.setItem('preferred-theme', theme);
                } catch (e) {}
              };

              var preferredTheme;

              try {
                preferredTheme = localStorage.getItem('preferred-theme');
              } catch (e) {}

              window.__themeListeners = [];

              var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
              darkQuery.addListener(function(e) {
                window.__setPreferredTheme(e.matches ? 'dark' : 'light');
                window.__themeListeners.forEach(function(listener) {
                  listener();
                });
              });

              setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
            })();
  `,
      }}
    />,
  ]);
};

export const wrapPageElement = ({ element }) => {
  return <ClientOnlyVisibleWrapper>{element}</ClientOnlyVisibleWrapper>;
};
