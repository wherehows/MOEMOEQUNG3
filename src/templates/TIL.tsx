import { Sidebar } from '@/components/Sidebar';
import { graphql, PageProps } from 'gatsby';
import { PostEdge, TILEdge, TIL } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import { getFolders } from '@/utils/helpers';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { TILContent } from '@/components/TILContent';

interface QueryResultType {
  allPosts: { edges: PostEdge[] };
  allTil: { edges: TILEdge[] };
}

interface PageContextType {
  slug: string;
}

export default function TILTemplate({
  data: {
    allPosts: { edges: allPostsEdges },
    allTil: { edges: allTilEdges },
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

  const folderInformations = getFolders(allPostsEdges);
  const tils = getTils(allTilEdges);

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
      <TILContent tils={tils} />
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
    allTil: allMarkdownRemark(
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

const getTils = (tilList: TILEdge[]): TIL[] =>
  tilList.map(({ node }) => {
    const { frontmatter, html, id } = node;
    const { date, debts, hashtags, title } = frontmatter;

    return {
      title,
      date,
      debts: JSON.parse(debts) as string[],
      hashtags: JSON.parse(hashtags) as string[],
      html,
      id,
    };
  });
