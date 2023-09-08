const WIDTH_INCLUDING_SIDEBAR_AND_CONTENT = '55rem';
const BOTH_SIDE_MARGIN_WIDTH = `calc(100% - ${WIDTH_INCLUDING_SIDEBAR_AND_CONTENT})`;
const ONE_SIDE_MARGIN_WIDTH = `calc(${BOTH_SIDE_MARGIN_WIDTH} / 2)`;
const MARGIN_BETWEEN_SIDEBAR_AND_CONTENT = '3rem';

export const SIDEBAR_PURE_WIDTH = '16rem';
export const SIDEBAR_WIDTH = `calc(${SIDEBAR_PURE_WIDTH} + ${ONE_SIDE_MARGIN_WIDTH})`;

export const CONTENT_LEFT_MARGIN_WIDTH = `calc(${SIDEBAR_WIDTH} + ${MARGIN_BETWEEN_SIDEBAR_AND_CONTENT})`;
export const CONTENT_WIDTH = `calc(100% - ${CONTENT_LEFT_MARGIN_WIDTH} - ${ONE_SIDE_MARGIN_WIDTH})`;

export const theme = {
  typography: {
    h1: { fontSize: '30px', fontWeight: 700, margin: 0 },
    h2: { fontSize: '22px', fontWeight: 600, margin: 0 },
    h3: { fontSize: '18px', fontWeight: 500, margin: 0 },
    logo: { fontSize: '30px', fontWeight: 700 },
    label: { fontSize: '14px', fontWeight: 500 },
    subtitle: { fontSize: '16px', fontWeight: 600 },
    body: { fontSize: '16px', fontWeight: 500 },
  },
};
