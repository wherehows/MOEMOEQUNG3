import { Sidebar } from '@/components/Sidebar';
import { graphql, PageProps } from 'gatsby';
import { Edge, Node } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import { getFolders } from '@/utils/helpers';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { TILContent } from '@/components/TILContent';

interface QueryResultType {
  allPosts: { edges: Edge[] };
  tilList: Node;
}

interface PageContextType {
  slug: string;
}

export default function TIL({
  data: {
    allPosts: { edges },
    tilList,
  },
}: PageProps<QueryResultType, PageContextType>) {
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
        isDetailPage
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <Sidebar
        folderInformations={folderInformations}
        isSidebarShown={isSidebarShown}
      />
      <TILContent />
    </ThemeProvider>
  );
}

export const getPosts = graphql`
  query {
    allPosts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...MarkdownRemarkFields
    }
    tilList: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(/til/)/" } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            date
            debts
            hashtags
            title
          }
        }
      }
    }
  }
`;
