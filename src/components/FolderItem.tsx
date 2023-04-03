import styled from '@emotion/styled';
import CustomLink from './CustomLink';

interface FolderItemProps {
  folderInformation: FolderInformation;
}

const FolderItem = ({ folderInformation }: FolderItemProps) => {
  const { folder, documents } = folderInformation;

  return (
    <Wrapper>
      <FolderName>{folder}</FolderName>
      <ParentWrapper>
        {documents.map(({ slug, subTitle, id }) => (
          <ChildListWrapper key={id}>
            <LinkButton to={slug}>{subTitle}</LinkButton>
          </ChildListWrapper>
        ))}
      </ParentWrapper>
    </Wrapper>
  );
};

export default FolderItem;

const Wrapper = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0',
}));

const ParentWrapper = styled('ul')(() => ({
  padding: 0,
  margin: '0.14rem 0 0 0',
}));

const FolderName = styled('div')(() => ({
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'var(--colors-primary)',
}));

const LinkButton = styled(CustomLink)(() => ({
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0',
  outline: 'none',

  '&:hover': {
    fontWeight: 'bold',
  },
}));

const ChildListWrapper = styled('li')(() => ({
  listStyleType: 'none',
  padding: '0',
  margin: '0 0 0 1.8rem',
}));
