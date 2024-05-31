import styled from '@emotion/styled';
import {
  LAYOUT_PADDING,
  PADDING_BETWEEN_SIDEBAR_AND_SCROLL,
  SIDEBAR_PURE_WIDTH,
  SIDEBAR_WIDTH,
} from '@/utils/const';
import FolderItem from './FolderItem';
import SidebarHeader from './SidebarHeader';
import { Post } from '@/utils/post';
import { StaticImage } from 'gatsby-plugin-image';

interface SidebarProps {
  categoryInformation: { [slug: string]: Post[] };
  isSidebarShown: boolean;
}

export const Sidebar = ({
  categoryInformation,
  isSidebarShown,
}: SidebarProps) => (
  <>
    {isSidebarShown && (
      <Wrapper>
        <SubWrapper>
          <SidebarHeader />
          <AvatarWrapper>
            <StaticImage
              src="../assets/avatar.png"
              alt="블로그 주인의 프로필 그림"
              width={256}
              height={256}
            />
          </AvatarWrapper>
          <FolderListWrapper>
            <FolderList>
              {Object.keys(categoryInformation).map((category, index) => (
                <FolderItem
                  key={index}
                  documentCount={+categoryInformation[category].length}
                  categoryName={category}
                />
              ))}
            </FolderList>
          </FolderListWrapper>
        </SubWrapper>
      </Wrapper>
    )}
  </>
);

const Wrapper = styled('div')(() => ({
  height: '100vh',
  display: 'none',
  flexDirection: 'column',
  left: 0,
  overflowY: 'auto',
  position: 'fixed',
  paddingRight: PADDING_BETWEEN_SIDEBAR_AND_SCROLL,
  '@media only screen and (max-width: 960px)': {
    color: 'white',
    zIndex: 1,
    top: 0,
    padding: '0 12px',
    backgroundColor: 'var(--colors-grey-04)',
    borderRadius: '0 25px 25px 0',
    display: 'flex',
  },
  '@media only screen and (min-width: 961px)': {
    width: SIDEBAR_WIDTH,
    alignItems: 'flex-end',
    display: 'flex',
  },
}));

const SubWrapper = styled('div')(() => ({
  width: SIDEBAR_PURE_WIDTH,
  paddingTop: LAYOUT_PADDING,
}));

const FolderListWrapper = styled('nav')(() => ({}));

const FolderList = styled('ul')(() => ({
  width: '100%',
  backgroundColor: 'transparent',
  position: 'relative',
  marginTop: 0,
  padding: 0,
}));

const AvatarWrapper = styled('div')(() => ({
  position: 'relative',
  zIndex: 0,
  borderRadius: '50%',
  overflow: 'hidden',
  margin: '32px 0',
  border: '3px solid var(--colors-grey-04)',
}));
