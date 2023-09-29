import { Sidebar } from '@/components/Sidebar';
import GlobalCss from '@/components/GlobalCss';
import { graphql, PageProps } from 'gatsby';
import { Edge, Node } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import { getFolders } from '@/utils/helpers';
import { PostDetailContent } from '@/components/PostDetailContent';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';

interface QueryResultType {
  allPosts: { edges: Edge[] };
  selectedPost: Node;
}

interface PageContextType {
  slug: string;
}

export default function PostDetail({
  data: {
    allPosts: { edges },
    selectedPost,
  },
  pageContext: { slug },
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
  const selectedDocument = selectedPost.html;
  const { title } = selectedPost.frontmatter;

  return (
    <>
      <GlobalCss />
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
        <PostDetailContent
          title={title}
          selectedDocument={selectedDocument}
          slug={slug}
        />
      </ThemeProvider>
    </>
  );
}

export const getPosts = graphql`
  query ($slug: String!) {
    allPosts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...MarkdownRemarkFields
    }
    selectedPost: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        date
        folder
        slug
        subTitle
        title
      }
      html
    }
  }
`;
