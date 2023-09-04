import { graphql } from 'gatsby';
import Sidebar from '@components/Sidebar';
import Content from '@components/Content';
import GlobalCss from '@components/GlobalCss';
import { Edge, IndexPageProps } from '@customTypes/common';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@utils/const';

const Main = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const documents = getDocuments(edges);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalCss />
        <Sidebar edges={edges} />
        <Content documents={documents} />
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
