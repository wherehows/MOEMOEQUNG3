import { CollapsibleSidebar, FixedSidebar } from '@/components/Sidebar';
import GlobalCss from '@/components/GlobalCss';
import { graphql, PageProps } from 'gatsby';
import { Edge, Node } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import Header from '@/components/Header';
import { useState } from 'react';
import { getFolders } from '@/utils/helpers';
import {
  PostDetailContentWithSidebar,
  PostDetailContentWithoutSidebar,
} from '@/components/PostDetailContent';

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
  const { isUnder960px } = useResponsiveWeb();
  const path = slug;

  const folderInformations = getFolders(edges);
  const selectedDocument = selectedPost.html;
  const { title } = selectedPost.frontmatter;

  return (
    <>
      <GlobalCss />
      <ThemeProvider theme={theme}>
        {isUnder960px ? (
          <>
            <Header
              isDetailPage
              isSidebarShown={isSidebarShown}
              setIsSidebarShown={setIsSidebarShown}
            />
            {isSidebarShown && (
              <CollapsibleSidebar folderInformations={folderInformations} />
            )}
          </>
        ) : (
          <FixedSidebar folderInformations={folderInformations} />
        )}
        {isUnder960px ? (
          <PostDetailContentWithoutSidebar
            title={title}
            selectedDocument={selectedDocument}
            pathname={path}
          />
        ) : (
          <PostDetailContentWithSidebar
            title={title}
            selectedDocument={selectedDocument}
            pathname={path}
          />
        )}
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
