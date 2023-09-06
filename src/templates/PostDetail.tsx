import Content from '@/components/Content';
import Sidebar from '@/components/Sidebar';
import GlobalCss from '@/components/GlobalCss';
import { graphql, PageProps } from 'gatsby';
import { Edge } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';

interface QueryResultType {
  allMarkdownRemark: { edges: Edge[] };
}

export default function PostDetail({
  data: {
    allMarkdownRemark: { edges },
  },
  path,
}: PageProps<QueryResultType>) {
  const res = getSelectedDocument(edges, path);

  // TODO: 게시글이 존재하지 않는 경우에 대한 에러 핸들링 필요
  if (!res) {
    return <></>;
  }

  const { html: selectedDocument, title } = res;

  return (
    <>
      <GlobalCss />
      <ThemeProvider theme={theme}>
        <Sidebar edges={edges} />
        <Content
          title={title}
          selectedDocument={selectedDocument}
          pathname={path}
        />
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
