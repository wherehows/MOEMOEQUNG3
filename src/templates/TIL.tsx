import { Sidebar } from '@/components/Sidebar';
import { graphql, PageProps } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import { getFolders } from '@/utils/helpers';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { TILContent } from '@/components/TILContent';
import { PostEdge } from '@/types/document';

export default function TILTemplate({
  data: {
    allPosts: { edges: allPostsEdges },
    allMemos: { nodes },
  },
}: PageProps<Queries.TILTemplateQuery>) {
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

  // TODO: Planned Typegen Integration
  const folderInformations = getFolders(allPostsEdges as unknown as PostEdge[]);

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
      <TILContent nodes={nodes} />
    </ThemeProvider>
  );
}

export const getPosts = graphql`
  query TILTemplate {
    allPosts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "/(/archive/)/" } }
    ) {
      ...MarkdownRemarkFields
    }
    allMemos: allSanityPost {
      nodes {
        _updatedAt
        id
        publishedAt
        title
        content
        debts {
          _key
          _type
          label
          value
        }
        tags {
          _key
          _type
          label
          value
        }
      }
    }
  }
`;
