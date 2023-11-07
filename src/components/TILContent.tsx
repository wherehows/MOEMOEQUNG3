import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';
import Typography from './Typography';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { changeUTCToYYYYMMDD } from '@/utils/time';

export const TILContent = ({ nodes }: Queries.TILTemplateQuery['allMemos']) => {
  const { isUnder960px } = useResponsiveWeb();

  return (
    <Wrapper>
      {!isUnder960px && (
        <Typography variant="h1">지극히 개인적인 공간이에요 🫠</Typography>
      )}
      <DocumentList>
        {nodes.map(({ title, publishedAt, tags, content, id, _updatedAt }) => {
          return (
            <DocumentItem key={id}>
              <Button
                onClick={e => {
                  const detail = e.currentTarget
                    .nextElementSibling as HTMLDivElement;

                  if (detail.style.display === 'none') {
                    detail.style.display = 'block';
                  } else {
                    detail.style.display = 'none';
                  }
                }}
              >
                <Typography variant="h2">{title}</Typography>
                {!!tags?.length && (
                  <Tags>
                    {tags.map(tag => {
                      const { label, value } = tag;
                      if (!label || !value) {
                        return <></>;
                      }

                      return <Tag key={value}>{label}</Tag>;
                    })}
                  </Tags>
                )}
                <SubInformation>
                  <Typography
                    as="time"
                    variant="label"
                    dateTime={changeUTCToYYYYMMDD(publishedAt)}
                  >
                    published at {changeUTCToYYYYMMDD(publishedAt)} | updated at{' '}
                    {changeUTCToYYYYMMDD(_updatedAt)}
                  </Typography>
                </SubInformation>
              </Button>
              <Collapsible>
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
                            borderBottom: '2px dashed var(--colors-orange-01)',
                          }}
                        >
                          {children}
                        </code>
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
                    h3(props) {
                      const { children, ...rest } = props;

                      return (
                        <h3
                          {...rest}
                          style={{
                            borderBottom: '1px dashed var(--colors-grey-01)',
                            padding: '0 0 4px 0',
                            margin: 0,
                          }}
                        >
                          📎 {children}
                        </h3>
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
                    a(props) {
                      return (
                        <a
                          {...props}
                          style={{
                            color: 'var(--colors-violet-01)',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '16px',
                          }}
                        />
                      );
                    },
                  }}
                />
              </Collapsible>
            </DocumentItem>
          );
        })}
      </DocumentList>
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

const DocumentItem = styled('li')(() => ({
  listStyle: 'none',
  marginBottom: '16px',
}));

const Button = styled('button')(() => ({
  width: '100%',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
}));

const DocumentList = styled('ul')(() => ({
  padding: 0,
  margin: 0,
}));

const Collapsible = styled('div')(() => ({
  display: 'none',
  borderTop: '2px solid var(--colors-violet-02)',
  padding: '12px 16px 0',
}));

const SubInformation = styled('div')(() => ({}));

const Tags = styled('ul')(() => ({
  display: 'flex',
}));

const Tag = styled('li')(() => ({
  borderRadius: '6px',
  backgroundColor: 'var(--colors-violet-02)',
  padding: '0 6px',
  marginRight: '8px',
  fontSize: '14px',
  fontWeight: 500,
  color: 'white',
}));
