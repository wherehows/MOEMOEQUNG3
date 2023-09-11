const MAIN_PURE_WIDTH = '39rem';
const SIDEBAR_PURE_WIDTH = '16rem';
const PADDING_BETWEEN_SIDEBAR_AND_SCROLL = '28px';
const MARGIN_BETWEEN_SIDEBAR_AND_MAIN = '1rem';
const TOTAL_CONTENT_WIDTH = `calc(${MAIN_PURE_WIDTH} + ${SIDEBAR_PURE_WIDTH} + ${MARGIN_BETWEEN_SIDEBAR_AND_MAIN} + ${PADDING_BETWEEN_SIDEBAR_AND_SCROLL})`;

const BOTH_SIDE_MARGIN_WIDTH = `calc(100% - ${TOTAL_CONTENT_WIDTH})`;
const ONE_SIDE_MARGIN_WIDTH = `calc(${BOTH_SIDE_MARGIN_WIDTH} / 2)`;

const SIDEBAR_WIDTH = `calc(${SIDEBAR_PURE_WIDTH} + ${ONE_SIDE_MARGIN_WIDTH} + ${PADDING_BETWEEN_SIDEBAR_AND_SCROLL})`;

const MAIN_LEFT_MARGIN_WIDTH = `calc(${SIDEBAR_WIDTH} + ${MARGIN_BETWEEN_SIDEBAR_AND_MAIN})`;

export {
  SIDEBAR_PURE_WIDTH,
  PADDING_BETWEEN_SIDEBAR_AND_SCROLL,
  SIDEBAR_WIDTH,
  MAIN_LEFT_MARGIN_WIDTH,
  MAIN_PURE_WIDTH,
};

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
