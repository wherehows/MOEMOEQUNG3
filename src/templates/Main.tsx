import { graphql } from 'gatsby';
import { CollapsibleSidebar, FixedSidebar } from '@/components/Sidebar';
import GlobalCss from '@/components/GlobalCss';
import { Edge, IndexPageProps } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import { MainWithSidebar, MainWithoutSidebar } from '@/components/MainContent';
import { useState } from 'react';
import Header from '@/components/Header';
import { getFolders } from '@/utils/helpers';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';

const Main = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: IndexPageProps) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const posts = getPosts(edges);
  const folders = getFolders(edges);
  const { isUnder960px } = useResponsiveWeb();

  return (
    <>
      <GlobalCss />
      <ThemeProvider theme={theme}>
        {isUnder960px ? (
          <>
            <Header
              isSidebarShown={isSidebarShown}
              setIsSidebarShown={setIsSidebarShown}
            />
            {isSidebarShown && <CollapsibleSidebar folders={folders} />}
          </>
        ) : (
          <FixedSidebar folders={folders} />
        )}
        {isUnder960px ? (
          <MainWithoutSidebar posts={posts} />
        ) : (
          <MainWithSidebar posts={posts} />
        )}
      </ThemeProvider>
    </>
  );
};

export default Main;

export const getPageProps = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      ...MarkdownRemarkFields
    }
  }
`;

const getPosts = (edges: Edge[]) =>
  edges.map(({ node }: Edge) => ({
    ...node,
    ...node.frontmatter,
  }));
