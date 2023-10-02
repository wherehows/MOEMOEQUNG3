import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_PURE_WIDTH } from '@/utils/const';
import Typography from './Typography';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { TIL } from '@/types/document';

interface TILContentProps {
  tils: TIL[];
}

export const TILContent = ({ tils }: TILContentProps) => {
  const { isUnder960px } = useResponsiveWeb();
  return (
    <Wrapper>
      {!isUnder960px && (
        <Typography variant="h1">
          프론트엔드 개발 및 관심사를 기록하는 블로그
        </Typography>
      )}
      <DocumentList>
        {tils?.map(({ title, date, html, hashtags, debts, id }) => (
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
              {!!hashtags.length && (
                <HashtagList>
                  {hashtags.map((hashtag, index) => (
                    <Hashtag key={index}>#{hashtag}</Hashtag>
                  ))}
                </HashtagList>
              )}
              <Typography variant="h2">{title}</Typography>
              <SubInformation>
                <Typography
                  as="time"
                  variant="label"
                  dateTime={date.toString()}
                >
                  {formatDate(date)}
                </Typography>
                {!!debts.length && (
                  <DebtCount> | {debts.length}개의 부채가 있어요!</DebtCount>
                )}
              </SubInformation>
            </Button>
            <Collapsible>
              <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
              {!!debts.length && (
                <>
                  <Typography variant="h2">부채</Typography>
                  <DebtList>
                    {debts.map(debt => (
                      <Debt>{debt}</Debt>
                    ))}
                  </DebtList>
                </>
              )}
            </Collapsible>
          </DocumentItem>
        ))}
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
  marginBottom: '2rem',
}));

const Button = styled('button')(() => ({
  width: '100%',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
}));

const DebtCount = styled('span')(({ theme }) => ({
  ...theme.typography.label,
  color: 'red',
}));

const DocumentList = styled('ul')(() => ({
  padding: 0,
  margin: 0,
}));

const Collapsible = styled('div')(() => ({
  display: 'none',
}));

const SubInformation = styled('div')(() => ({}));

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

const HashtagList = styled('ul')(() => ({
  display: 'flex',
}));

const Hashtag = styled('li')(() => ({
  marginRight: '4px',
}));

const DebtList = styled('ul')(() => ({}));

const Debt = styled('li')(() => ({}));

const formatDate = (date: Date) => {
  const sArray = date.toString().split('-');
  return `${sArray[0].slice(2, 4)}년 ${sArray[1]}월 ${sArray[2]}일`;
};
