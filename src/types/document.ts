export interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
}
export interface Folder {
  folder: string;
  documents: DocumentInformation[];
}

interface DocumentInformation {
  date: Date;
  folder: string;
  title: string;
  subTitle: string;
  slug: string;
  html: string;
}

interface Frontmatter {
  date: Date;
  title: string;
  subTitle: string;
  folder: string;
  slug: string;
  index: number;
}

export interface Node {
  frontmatter: Frontmatter;
  html: string;
}

export interface Edge {
  node: Node;
}

export type MarkdownDocument = DocumentInformation & Frontmatter;
