import styled from '@emotion/styled';
import CustomLink from './CustomLink';
import { FolderInformation } from '@customTypes/common';
import Typography from './Typography';

interface FolderItemProps {
  folderInformation: FolderInformation;
}

const FolderItem = ({ folderInformation }: FolderItemProps) => {
  const { folder, documents } = folderInformation;

  return (
    <Wrapper>
      <Typography variant="subtitle">{folder}</Typography>
      <DocumentList>
        {documents.map(({ slug, subTitle, id }) => (
          <DocumentItem key={id}>
            <LinkButton to={slug}>{subTitle}</LinkButton>
          </DocumentItem>
        ))}
      </DocumentList>
    </Wrapper>
  );
};

export default FolderItem;

const Wrapper = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0',
}));

const DocumentList = styled('ul')(() => ({
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

const DocumentItem = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0 0 0 1.8rem',
}));
