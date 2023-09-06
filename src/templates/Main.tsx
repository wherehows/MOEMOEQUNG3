import { graphql } from 'gatsby';
import Sidebar from '@/components/Sidebar';
import GlobalCss from '@/components/GlobalCss';
import { Edge, IndexPageProps } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import MainContent from '@/components/MainContent';

const Main = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const documents = getDocuments(edges);

  return (
    <>
      <GlobalCss />
      <ThemeProvider theme={theme}>
        <Sidebar edges={edges} />
        <MainContent documents={documents} />
      </ThemeProvider>
    </>
  );
};

export default Main;

export const getPosts = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      ...MarkdownRemarkFields
    }
  }
`;

const getDocuments = (edges: Edge[]) =>
  edges.map(({ node }: Edge) => ({
    ...node,
    ...node.frontmatter,
  }));
