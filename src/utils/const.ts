const BOTH_SIDE_MARGIN_WIDTH = 'calc(100% - 55rem)';
const ONE_SIDE_MARGIN_WIDTH = `calc(${BOTH_SIDE_MARGIN_WIDTH} / 2)`;

export const SIDEBAR_PURE_WIDTH = '16rem';
export const SIDEBAR_WIDTH = `calc(${SIDEBAR_PURE_WIDTH} + ${ONE_SIDE_MARGIN_WIDTH})`;

export const CONTENT_LEFT_MARGIN_WIDTH = `calc(${SIDEBAR_WIDTH} + 3rem)`;
export const CONTENT_WIDTH = `calc(100% - ${CONTENT_LEFT_MARGIN_WIDTH} - ${ONE_SIDE_MARGIN_WIDTH})`;

export const theme = {
  typography: {
    h1: { fontSize: '30px', fontWeight: 700 },
    h2: { fontSize: '22px', fontWeight: 600 },
    h3: { fontSize: '18px', fontWeight: 500 },
    logo: { fontSize: '30px', fontWeight: 700 },
    label: { fontSize: '14px', fontWeight: 500 },
    body: { fontSize: '16px', fontWeight: 500 },
  },
};
