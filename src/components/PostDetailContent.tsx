import styled from '@emotion/styled';
import {
  LAYOUT_PADDING,
  MAIN_LEFT_MARGIN_WIDTH,
  MAIN_PURE_WIDTH,
} from '@/utils/const';
import ViewCounter from './ViewCounter';
import Typography from './Typography';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ContentProps {
  selectedPost: Queries.TypegenPageQuery['selectedPostQueryData'];
}

export const PostDetailContent = ({ selectedPost }: ContentProps) => {
  if (!selectedPost) {
    return <></>;
  }

  const { title, slug, content } = selectedPost;

  return (
    <Wrapper>
      <Typography variant="h1">{title}</Typography>
      <ViewCounter slug={slug.current} />
      <Markdown
        children={content}
        components={{
          code(props) {
            // The type of 'ref' is inferred incorrectly.
            const { children, className, ref, ...rest } = props;

            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                children={String(children).replace(/\n$/, '')}
                style={cb}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code
                {...rest}
                style={{
                  fontFamily: 'inherit',
                  fontWeight: '400',
                  backgroundColor: 'var(--dark-mode-grey)',
                  borderRadius: '4px',
                  padding: '2px 5px',
                  marginRight: '2px',
                }}
              >
                {children}
              </code>
            );
          },
          blockquote(props) {
            return (
              <blockquote
                {...props}
                style={{
                  position: 'relative',
                  margin: '0 24px',
                  fontSize: '16px',
                  paddingLeft: '8px',
                  borderLeft: '8px solid var(--colors-violet-02)',
                }}
              />
            );
          },
          li(props) {
            const { children, ...rest } = props;
            return (
              <li
                {...rest}
                style={{
                  listStyle: 'auto',
                }}
              >
                {children}
              </li>
            );
          },
          h2(props) {
            const { children, ...rest } = props;

            return (
              <h2
                {...rest}
                style={{
                  borderBottom: '1px dashed var(--colors-grey-02)',
                  padding: '0 0 4px 0',
                  margin: 0,
                }}
              >
                {children}
              </h2>
            );
          },
          p(props) {
            const { children, ...rest } = props;
            let style = {};

            if (
              children &&
              typeof children === 'object' &&
              'props' in children &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              children?.props?.node?.tagName === 'a'
            ) {
              style = { textAlign: 'right' };
            }

            return (
              <p {...rest} style={style}>
                {children}
              </p>
            );
          },
          img(props) {
            return (
              <img
                {...props}
                style={{
                  margin: '32px auto',
                }}
              />
            );
          },
          a(props) {
            return (
              <a
                {...props}
                style={{
                  color: 'var(--dark-mode-violet)',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              />
            );
          },
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled('main')(() => ({
  maxWidth: MAIN_PURE_WIDTH,
  paddingBottom: LAYOUT_PADDING,

  height: '100%',
  '@media only screen and (max-width: 960px)': {
    margin: '0 auto',
    padding: LAYOUT_PADDING,
  },
  '@media only screen and (min-width: 961px)': {
    marginLeft: MAIN_LEFT_MARGIN_WIDTH,
  },
}));
