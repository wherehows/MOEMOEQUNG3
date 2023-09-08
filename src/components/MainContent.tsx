import styled from '@emotion/styled';
import { MAIN_LEFT_MARGIN_WIDTH, MAIN_WIDTH } from '@/utils/const';
import CustomLink from './CustomLink';
import Typography from './Typography';
import { MarkdownDocument } from '@/types/document';

interface ContentProps {
  documents: MarkdownDocument[];
}

const MainContent = ({ documents }: ContentProps) => (
  <Wrapper>
    <Typography variant="h1">
      프론트엔드 개발 및 관심사를 기록하는 블로그
    </Typography>
    <DocumentList>
      {documents?.map(({ html, title, date, slug }: MarkdownDocument) => (
        <DocumentItem key={slug}>
          <Button to={slug}>
            <Typography variant="h2">{title}</Typography>
            <PostDate dateTime={date.toString()}>{formatDate(date)}</PostDate>
            <Typography as={Description}>
              {changeMarkdownToTextContent(html)}
            </Typography>
          </Button>
        </DocumentItem>
      ))}
    </DocumentList>
  </Wrapper>
);

export default MainContent;

const Wrapper = styled('div')(() => ({
  diplay: 'flex',
  marginLeft: MAIN_LEFT_MARGIN_WIDTH,
  width: MAIN_WIDTH,
  height: '100%',
}));

const DocumentItem = styled('li')(() => ({
  listStyleType: 'none',
  marginBottom: '2rem',
}));

const Button = styled(CustomLink)(() => ({
  backgroundColor: 'transparent',
  border: 'none',
  width: '100%',
  padding: 0,
  cursor: 'pointer',
  outline: 'none',
}));

const PostDate = styled('time')(({ theme }) => ({
  ...theme.typography.label,
}));

const Description = styled('div')(() => ({
  display: 'inline-block',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  lineHeight: 1.2,
  height: '3.6rem',
  textAlign: 'left',
  wordWrap: 'break-word',
  webkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
}));

const DocumentList = styled('ul')(() => ({
  padding: 0,
  margin: 0,
}));

const changeMarkdownToTextContent = (html: MarkdownDocument['html']) =>
  html.replace(/<[^>]+>/g, '');

const formatDate = (date: MarkdownDocument['date']) => {
  const sArray = date.toString().split('-');
  return `${sArray[0].slice(2, 4)}년 ${sArray[1]}월 ${sArray[2]}일`;
};
