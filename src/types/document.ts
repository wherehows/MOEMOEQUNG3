export interface AllPostsProp {
  allPosts: {
    edges: PostEdge[];
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
}

interface PostFrontmatter {
  date: Date;
  title: string;
  subTitle: string;
  folder: string;
  slug: string;
  index: number;
}

export interface PostNode {
  frontmatter: PostFrontmatter;
  html: string;
}

export interface PostEdge {
  node: PostNode;
}

export type MarkdownDocument = DocumentInformation & PostFrontmatter;
