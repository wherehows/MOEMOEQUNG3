import styled from '@emotion/styled';
import { CONTENT_LEFT_MARGIN_WIDTH, CONTENT_WIDTH } from '@/utils/const';
import ViewCounter from './ViewCounter';
import Typography from './Typography';

interface ContentProps {
  title: string;
  pathname: string;
  selectedDocument: string;
}

const PostDetailContent = ({
  title,
  selectedDocument,
  pathname,
}: ContentProps) => {
  return (
    <Wrapper>
      <Typography variant="h1">{title}</Typography>
      <ViewCounter pathname={pathname} />
      <MarkdownRenderer
        dangerouslySetInnerHTML={{ __html: selectedDocument }}
      />
    </Wrapper>
  );
};

export default PostDetailContent;

const Wrapper = styled('div')(() => ({
  diplay: 'flex',
  marginLeft: CONTENT_LEFT_MARGIN_WIDTH,
  width: CONTENT_WIDTH,
  height: '100%',
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
