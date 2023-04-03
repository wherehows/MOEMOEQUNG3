interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
}
interface Edge {
  node: {
    frontmatter: {
      date: Date;
      title: string;
      subTitle: string;
      grandfolder: string;
      folder: string;
      slug: string;
      index: number;
    };
    html: string;
    id: string;
  };
}

interface MarkdownDocument {
  date: Date;
  grandfolder: string;
  folder: string;
  title: string;
  subTitle: string;
  index: number;
  slug: string;
  html: string;
  id: string;
}

interface GrandParentData {
  [key: string]: {
    grandfolder: string;
    folder: string;
    children: (MarkdownDocument | MarkdownDocumentNode)[];
  };
}

interface ParentData {
  [key: string]: MarkdownDocumentNode;
}

interface MarkdownDocumentNode {
  grandfolder: string;
  folder: string;
  children: MarkdownDocument[];
}

type Theme = 'dark' | 'light';
