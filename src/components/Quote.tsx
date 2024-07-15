import styled from '@emotion/styled';
import quoteInformation from '../assets/quote.json';

const Index = () => {
  const { quotes } = quoteInformation;
  const targetQuote = getRandomIndex(quotes);

  if (!targetQuote) {
    return <></>;
  }

  const { author, quote, isBook } = targetQuote;

  return (
    <Wrapper>
      <Quote>{quote}</Quote>
      <Cite>
        <Dash />
        {author}
        {`${isBook ? '中' : ''}`}
      </Cite>
    </Wrapper>
  );
};

export default Index;

const getRandomIndex = <T,>(array: T[]) => {
  if (array.length === 0) {
    console.error('배열이 비어있습니다.');
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const Wrapper = styled('blockquote')(() => ({
  margin: '40px 0',
  position: 'relative',
  fontSize: '18px',
  padding: '12px 16px',
  borderLeft: '15px solid var(--colors-violet-02)',
  boxShadow: 'var(--dark-mode-boxShadow)',
}));

const Quote = styled('div')(() => ({
  whiteSpace: 'pre-wrap',
}));

const Cite = styled('cite')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  textAlign: 'right',
  marginTop: '22px',
  color: 'var(--colors-violet-02)',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 600,
}));

const Dash = styled('div')(() => ({
  display: 'inline-block',
  height: '2px',
  width: '14px',
  backgroundColor: 'var(--colors-violet-02)',
  marginRight: '4px',
  verticalAlign: 'middle',
}));
