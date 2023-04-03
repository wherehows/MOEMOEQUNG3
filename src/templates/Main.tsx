import { graphql } from 'gatsby';
import Sidebar from '@components/Sidebar';
import Content from '@components/Content';
import GlobalCss from '@components/GlobalCss';

const Main = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const documents = getDocuments(edges);

  return (
    <>
      <GlobalCss />
      <Sidebar edges={edges} />
      <Content documents={documents} />
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
