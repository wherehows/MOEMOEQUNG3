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
      <blockquote
        style={{
          fontSize: '18px',
          color: '#444',
          borderLeft: '8px solid #2c2c2c',
          padding: '8px 16px',
          margin: '18px 0',
          background: '#ffffff',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
          fontStyle: 'normal',
        }}
      >
        <div>
          아는 것과 모르는 것은 다르고, 제대로 아는 것과 아는 것은 또 다르다.
          <br />
          아는 것은 아는 것 대로 중요하고, 제대로 아는 것은 제대로 아는 것 대로
          중요하다.
        </div>
        <cite
          style={{
            display: 'block',
            textAlign: 'right',
            marginTop: '20px',
            color: '#2c2c2c',
            fontWeight: 'bold',
          }}
        >
          블로그 주인장의 첫 회사 사수
        </cite>
      </blockquote>
      {/* <blockquote
        style={{
          fontSize: '1.2em',
          color: '#333',
          borderLeft: '15px solid #ccc',
          padding: '8px 12px',
          margin: '18px 0',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          // background: '#f9f9f9',
        }}
      >
        <div>
          아는 것과 모르는 것은 다르고, 제대로 아는 것과 아는 것은 또 다르다.
          <br />
          아는 것은 아는 것 대로 중요하고, 제대로 아는 것은 제대로 아는 것 대로
          중요하다
        </div>
        <cite
          style={{
            display: 'block',
            textAlign: 'right',
            marginTop: '22px',
          }}
        >
          - 블로그 주인장의 첫 회사 사수
        </cite>
      </blockquote> */}
      {/* <blockquote
        style={
          {
            // margin: '12px 0',
            // position: 'relative',
            // fontSize: '16px',
            // padding: '8px 12px  ',
            // borderLeft: '15px solid var(--colors-violet-02)',
            // '-moz-box-shadow': '2px 2px 15px #ccc',
            // '-webkit-box-shadow': '2px 2px 15px #ccc',
            // boxShadow: '2px 2px 15px #ccc',
          }
        }
      >
        <div>
          아는 것과 모르는 것은 다르고, 제대로 아는 것과 아는 것은 또 다르다.
          <br />
          아는 것은 아는 것 대로 중요하고, 제대로 아는 것은 제대로 아는 것 대로
          중요하다
        </div>
        <cite
          style={{
            display: 'block',
            textAlign: 'right',
            marginTop: '22px',
          }}
        >
          - 블로그 주인장의 첫 회사 사수
        </cite>
      </blockquote> */}
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
