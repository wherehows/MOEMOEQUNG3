import styled from '@emotion/styled';
import CustomLink from './CustomLink';
import { Folder } from '@/types/document';
import Typography from './Typography';

interface FolderItemProps {
  folderInformation: Folder;
}

const FolderItem = ({ folderInformation }: FolderItemProps) => {
  const { folder, posts } = folderInformation;

  return (
    <Wrapper>
      <Typography variant="subtitle">{folder}</Typography>
      <PostList>
        {posts.map(({ slug, subTitle }) => (
          <PostItem key={slug}>
            <LinkButton to={slug}>{subTitle}</LinkButton>
          </PostItem>
        ))}
      </PostList>
    </Wrapper>
  );
};

export default FolderItem;

const Wrapper = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0',
}));

const PostList = styled('ul')(() => ({
  padding: 0,
  margin: '0.14rem 0 0 0',
}));

const LinkButton = styled(CustomLink)(({ theme }) => ({
  ...theme.typography.body,
  cursor: 'pointer',

  '&:hover': {
    fontWeight: 600,
  },
}));

const PostItem = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0 0 0 1.8rem',
}));
