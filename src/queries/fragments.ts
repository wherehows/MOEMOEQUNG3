import { graphql } from 'gatsby';

export const markdownRemarkFieldFragment = graphql`
  fragment MarkdownRemarkFields on MarkdownRemarkConnection {
    edges {
      node {
        html
        id
        frontmatter {
          date
          folder
          title
          subTitle
          slug
        }
      }
    }
  }
`;
