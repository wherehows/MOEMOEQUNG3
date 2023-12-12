import { PageProps, graphql } from 'gatsby';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import { ListContent } from '@/components/ListContent';
import { useState } from 'react';
import Header from '@/components/Header';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { getAllPosts, getCategoryInformation } from '@/utils/post';

const List = ({
  data: { postsQueryData },
  pageContext: { value: currentPageCategory },
}: PageProps<
  Queries.TypegenPageQuery,
  {
    value: string;
  }
>) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);
  const categoryInformation = getCategoryInformation(postsQueryData);
  const allDocuments = getAllPosts(postsQueryData);

  useResponsiveWeb([
    {
      bp: 960,
      onIntersection: isUnderBp => {
        if (isUnderBp) {
          setIsSidebarShown(false);
        } else {
          setIsSidebarShown(true);
        }
      },
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Header
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <Sidebar
        isSidebarShown={isSidebarShown}
        categoryInformation={categoryInformation}
      />
      <ListContent
        listName={currentPageCategory && `${currentPageCategory} 관련`}
        posts={
          currentPageCategory
            ? categoryInformation[currentPageCategory].sort((a, b) => {
                return +new Date(b.publishedAt) - +new Date(a.publishedAt);
              })
            : allDocuments.sort((a, b) => {
                return +new Date(b.publishedAt) - +new Date(a.publishedAt);
              })
        }
      />
    </ThemeProvider>
  );
};

export default List;

export const getPosts = graphql`
  query {
    postsQueryData: allSanityPosts {
      nodes {
        _updatedAt
        id
        slug {
          _key
          _type
          current
          source
        }
        publishedAt
        title
        content
        debts {
          _key
          _type
          label
          value
        }
        tags {
          _key
          _type
          label
          value
        }
      }
    }
  }
`;
