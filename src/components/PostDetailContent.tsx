import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';
import ViewCounter from './ViewCounter';
import Typography from './Typography';

interface ContentProps {
  title: string;
  slug: string;
  html: string;
}

const Common = ({ title, slug, html }: ContentProps) => {
  return (
    <>
      <Typography variant="h1">{title}</Typography>
      <ViewCounter slug={slug} />
      <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export const PostDetailContentWithoutSidebar = (props: ContentProps) => {
  return (
    <PostDetailContentWithoutSidebarWrapper>
      <Common {...props} />
    </PostDetailContentWithoutSidebarWrapper>
  );
};

export const PostDetailContentWithSidebar = (props: ContentProps) => {
  return (
    <PostDetailContentWithSidebarWrapper>
      <Common {...props} />
    </PostDetailContentWithSidebarWrapper>
  );
};

const BaseWrapper = styled('main')(() => ({
  width: MAIN_PURE_WIDTH,
  height: '100%',
}));

const PostDetailContentWithoutSidebarWrapper = styled(BaseWrapper)(() => ({
  margin: '0 auto',
}));

const PostDetailContentWithSidebarWrapper = styled(BaseWrapper)(() => ({
  marginLeft: MAIN_LEFT_MARGIN_WIDTH,
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
