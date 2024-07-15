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
import Quote from './Quote';
import useIsMounted from '@/hooks/useIsMounted';

interface ContentProps {
  selectedPost: Queries.TypegenPageQuery['selectedPostQueryData'];
}

export const PostDetailContent = ({ selectedPost }: ContentProps) => {
  if (!selectedPost) {
    return <></>;
  }
  const isMounted = useIsMounted();
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
      {isMounted && <Quote />}
    </Wrapper>
  );
};

const Blockquote = styled.blockquote`
  width: 100% !important;
  padding: 25px 0 20px 25px !important;
  border-left: 5px solid #5857ff;
  border-bottom: 5px solid #5857ff;
  position: relative;
  margin: 0;

  &:before {
    content: '';
    position: absolute !important;
    width: 10%;
    height: 100% !important;
    top: 0;
    left: -1px;
    border-top: 5px solid #5857ff;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 15%;
    bottom: -5px;
    left: 0;
    box-shadow: inset -5px 0 0 0 #5857ff;
  }

  p {
    font-style: italic;
    font-size: 32px;
    line-height: 44px;
    font-weight: 500;
    padding-bottom: 27px;
  }
`;

// const blockquoteStyle = {
//   position: 'relative',
//   fontSize: '1.2em',
//   // fontStyle: 'italic',
//   color: '#333',
//   borderLeft: '8px solid #8f9aff',
//   margin: '1em 0',
//   backgroundColor: '#f9f9f9',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//   padding: '20px 8px',
// };

// const quoteMarkStyle = {
//   position: 'absolute',
//   fontSize: '3em',
//   color: '#8f9aff',
// };

// const citeStyle = {
//   display: 'block',
//   marginTop: '1em',
//   fontSize: '1em',
//   fontStyle: 'normal',
//   color: '#555',
// };

// const authorStyle = {
//   fontWeight: 'bold',
// };

// const sourceStyle = {
//   fontStyle: 'italic',
//   color: '#777',
// };

// const Blockquote = () => {
//   return (
//     <blockquote style={blockquoteStyle}>
//       <span style={quoteMarkStyle}>&ldquo;</span>
//       <div style={{}}>
//         <div>
//           아는 것과 모르는 것은 다르고, 제대로 아는 것과 아는 것은 또 다르다.
//           <br />
//           아는 것은 아는 것 대로 중요하고, 제대로 아는 것은 제대로 아는 것 대로
//           중요하다
//         </div>
//         <cite style={citeStyle}>
//           <span style={authorStyle}>ㅡ 블로그 주인의 첫 직장 사수</span>{' '}
//           {/* <span style={sourceStyle}>Source Title</span> */}
//         </cite>
//       </div>
//     </blockquote>
//   );
// };

// const WiseSaying = styled('div')(() => ({
//   '&::first-letter': {
//     float: 'left',
//     fontSize: '35px',
//     fontWeight: 'bold',
//   },
// }));

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
