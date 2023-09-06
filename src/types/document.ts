export interface IndexPageProps {
  data: {
    allMarkdownRemark: {
      edges: Edge[];
    };
  };
}
export interface FolderInformation {
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
  id: string;
}

interface Frontmatter {
  date: Date;
  title: string;
  subTitle: string;
  folder: string;
  slug: string;
  index: number;
}

export interface Edge {
  node: {
    frontmatter: Frontmatter;
    html: string;
    id: string;
  };
}

export type MarkdownDocument = DocumentInformation & Frontmatter;
