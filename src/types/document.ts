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

export interface DocumentInformation {
  date: Date;
  folder: string;
  title: string;
  subTitle: string;
  index: number;
  slug: string;
  html: string;
  id: string;
}

export interface Edge {
  node: {
    frontmatter: {
      date: Date;
      title: string;
      subTitle: string;
      folder: string;
      slug: string;
      index: number;
    };
    html: string;
    id: string;
  };
}
