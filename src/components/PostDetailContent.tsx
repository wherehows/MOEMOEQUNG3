import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';
import ViewCounter from './ViewCounter';
import Typography from './Typography';

interface ContentProps {
  title: string;
  slug: string;
  selectedDocument: string;
}

const Common = ({ title, slug, selectedDocument }: ContentProps) => {
  return (
    <>
      <Typography variant="h1">{title}</Typography>
      <ViewCounter slug={slug} />
      <MarkdownRenderer
        dangerouslySetInnerHTML={{ __html: selectedDocument }}
      />
    </>
  );
};

export const PostDetailContent = (props: ContentProps) => {
  return (
    <Wrapper>
      <Common {...props} />
    </Wrapper>
  );
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

const MarkdownRenderer = styled('div')(() => ({
  width: '100%',
  fontSize: '1rem',
  a: {
    color: 'var(--colors-primary)',
    textDecoration: 'none',
    fontWeight: 'bold',
  },

  'a:visited': {
    color: 'var(--colors-primary)',
    fontWieght: 'bold',
  },
}));
