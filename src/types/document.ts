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

interface TILFrontmatter {
  title: string;
  date: Date;
  hashtags: string;
  debts: string;
}

export type TIL = Omit<TILFrontmatter, 'hashtags' | 'debts'> &
  Omit<TILNode, 'frontmatter'> & {
    hashtags: string[];
    debts: string[];
  };

export interface TILNode {
  frontmatter: TILFrontmatter;
  html: string;
  id: string;
}

export interface TILEdge {
  node: TILNode;
}
