import styled from '@emotion/styled';
import {
  LAYOUT_PADDING,
  MAIN_LEFT_MARGIN_WIDTH,
  MAIN_PURE_WIDTH,
} from '@/utils/const';
import CustomLink from './CustomLink';
import Typography from './Typography';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { changeUTCToYYYYMMDD } from '@/utils/time';
import { Post } from '@/utils/post';

interface ListContentProps {
  listName?: string;
  posts?: Post[];
}

export const ListContent = ({ listName, posts }: ListContentProps) => {
  const { isUnder960px } = useResponsiveWeb();

  return (
    <Wrapper>
      {!isUnder960px && listName && (
        <Typography variant="h2">{listName}</Typography>
      )}
      <DocumentList>
        {posts?.map(({ title, slug, publishedAt, _updatedAt }) => (
          <DocumentItem key={slug}>
            <Button to={slug}>
              <Typography variant="h2">{title}</Typography>
              <Typography
                as="time"
                variant="label"
                style={{
                  color: 'var(--colors-grey-03)',
                }}
                dateTime={changeUTCToYYYYMMDD(publishedAt)}
              >
                written at {changeUTCToYYYYMMDD(publishedAt)}
              </Typography>
            </Button>
          </DocumentItem>
        ))}
      </DocumentList>
    </Wrapper>
  );
};

const Wrapper = styled('main')(() => ({
  display: 'none',
  width: MAIN_PURE_WIDTH,
  height: '100%',
  paddingBottom: LAYOUT_PADDING,
  '@media only screen and (max-width: 960px)': {
    margin: '0 auto',
    display: 'flex',
  },
  '@media only screen and (min-width: 961px)': {
    marginLeft: MAIN_LEFT_MARGIN_WIDTH,
    display: 'block',
  },
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

const DocumentList = styled('ul')(() => ({
  padding: 0,
  margin: 0,
}));
