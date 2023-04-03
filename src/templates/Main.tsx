import { graphql } from 'gatsby';
import Sidebar from '@components/Sidebar';
import Content from '@components/Content';
import { getFolders } from '@utils/helpers';
import GlobalCss from '@components/GlobalCss';

const Main = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const folders = getFolders(edges);
  const documents = getDocuments(edges);

  return (
    <>
      <GlobalCss />
      <Sidebar folders={folders} />
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
