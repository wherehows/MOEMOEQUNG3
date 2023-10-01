import { graphql } from 'gatsby';
import { Sidebar } from '@/components/Sidebar';
import { IndexPageProps } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import { useState } from 'react';
import Header from '@/components/Header';
import { getFolders } from '@/utils/helpers';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { WriterContent } from '@/components/WriterContent';

const Writer = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  useResponsiveWeb([
    {
      bp: 960,
      onIntersection: isUnderBp => {
        if (isUnderBp) {
          setIsSidebarShown(false);
        } else {
          setIsSidebarShown(true);
        }
      },
    },
  ]);

  const folderInformations = getFolders(edges);

  return (
    <ThemeProvider theme={theme}>
      <Header
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <Sidebar
        isSidebarShown={isSidebarShown}
        folderInformations={folderInformations}
      />
      <WriterContent />
    </ThemeProvider>
  );
};

export default Writer;

export const getPosts = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      ...MarkdownRemarkFields
    }
  }
`;
