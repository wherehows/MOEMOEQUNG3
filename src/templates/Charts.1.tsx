import { Sidebar } from '@/components/Sidebar';
import { PageProps } from 'gatsby';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import Header from '@/components/Header';
import { useState } from 'react';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';
import { getCategoryInformation } from '@/utils/post';

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
      <ChartsDetail />
    </ThemeProvider>
  );
}
