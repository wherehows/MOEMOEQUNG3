import Content from '@components/Content';
import Sidebar from '@components/Sidebar';
import { getFolders } from '@utils/helpers';
import GlobalCss from '@components/GlobalCss';
import { graphql, PageProps } from 'gatsby';

interface QueryResultType {
  allMarkdownRemark: { edges: Edge[] };
}

export default function PostDetail({
  data: {
    allMarkdownRemark: { edges },
  },
  path,
}: PageProps<QueryResultType>) {
  const folders = getFolders(edges);
  const selectedDocument = getSelectedDocument(edges, path);

  return (
    <>
      <GlobalCss />
      <Sidebar folders={folders} />
      <Content selectedDocument={selectedDocument} pathname={path} />
    </>
  );
}

const getSelectedDocument = (edges: Edge[], targetDocumentPath: string) => {
  const edge = edges.find(({ node }: Edge) => {
    if (node.frontmatter.slug === targetDocumentPath) {
      return true;
    }
  });

  return edge && edge.node.html;
};

export const getPosts = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      ...MarkdownRemarkFields
    }
  }
`;
