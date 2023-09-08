import { CollapsibleSidebar, FixedSidebar } from '@/components/Sidebar';
import GlobalCss from '@/components/GlobalCss';
import { graphql, PageProps } from 'gatsby';
import { Edge } from '@/types/document';
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
  allMarkdownRemark: { edges: Edge[] };
}

export default function PostDetail({
  data: {
    allMarkdownRemark: { edges },
  },
  path,
}: PageProps<QueryResultType>) {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const folderInformations = getFolders(edges);
  const res = getSelectedDocument(edges, path);
  const { isUnder960px } = useResponsiveWeb();

  // TODO: 게시글이 존재하지 않는 경우에 대한 에러 핸들링 필요
  if (!res) {
    return <></>;
  }

  const { html: selectedDocument, title } = res;

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

const getSelectedDocument = (edges: Edge[], targetDocumentPath: string) => {
  const edge = edges.find(({ node }: Edge) => {
    if (node.frontmatter.slug === targetDocumentPath) {
      return true;
    }
  });

  let res = null;

  if (edge) {
    const { frontmatter, html } = edge.node;
    res = { title: frontmatter.title, html };
  }

  return res;
};

export const getPosts = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      ...MarkdownRemarkFields
    }
  }
`;
