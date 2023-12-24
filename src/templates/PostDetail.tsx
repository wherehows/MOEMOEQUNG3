import { Sidebar } from '@/components/Sidebar';
import { graphql, PageProps } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import { PostDetailContent } from '@/components/PostDetailContent';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { getCategoryInformation } from '@/utils/post';

export default function PostDetail({
  data: { postsQueryData, selectedPostQueryData },
}: PageProps<Queries.TypegenPageQuery>) {
  const [isSidebarShown, setIsSidebarShown] = useState(true);
  const categoryInformation = getCategoryInformation(postsQueryData);

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
        isDetailPage
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <Sidebar
        categoryInformation={categoryInformation}
        isSidebarShown={isSidebarShown}
      />
      <PostDetailContent selectedPost={selectedPostQueryData} />
    </ThemeProvider>
  );
}

export const getPosts = graphql`
  query TypegenPage($current: String!) {
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
    selectedPostQueryData: sanityPosts(slug: { current: { eq: $current } }) {
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
`;
