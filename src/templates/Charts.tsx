import { Sidebar } from '@/components/Sidebar';
import { graphql, PageProps } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { getCategoryInformation } from '@/utils/post';
import { ChartsDetail } from '@/components/ChartsDetail';

export default function Charts({
  data: { postsQueryData },
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
      <ChartsDetail data={postsQueryData} />
    </ThemeProvider>
  );
}

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

function convertUtcToKst(utcTimeStr) {
  // UTC 시간 문자열을 Date 객체로 변환
  const utcDate = new Date(utcTimeStr);

  // 한국 시간대를 위한 옵션 설정
  const options = {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
  };

  // 한국 시간대로 변환
  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const parts = formatter.formatToParts(utcDate);

  // 년과 월 추출
  let year = '';
  let month = '';

  for (const part of parts) {
    if (part.type === 'year') {
      year = part.value;
    } else if (part.type === 'month') {
      month = part.value;
    }
  }

  return [year, month];
}
