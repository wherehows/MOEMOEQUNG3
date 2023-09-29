import styled from '@emotion/styled';
import {
  PADDING_BETWEEN_SIDEBAR_AND_SCROLL,
  SIDEBAR_PURE_WIDTH,
  SIDEBAR_WIDTH,
} from '@/utils/const';
import FolderItem from './FolderItem';
import SidebarHeader from './SidebarHeader';
import { FolderInformation } from '@/types/document';

interface SidebarProps {
  folderInformations: FolderInformation[];
  isSidebarShown: boolean;
}

export const Sidebar = ({
  folderInformations,
  isSidebarShown,
}: SidebarProps) => (
  <>
    {isSidebarShown && (
      <Wrapper>
        <SubWrapper>
          <SidebarHeader />
          <FolderListWrapper>
            <FolderList>
              {folderInformations.map((folderInformation, index) => (
                <FolderItem key={index} folderInformation={folderInformation} />
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
    zIndex: 1,
    top: 0,
    padding: '0 12px',
    backgroundColor: 'var(--dark-background)',
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
}));

const FolderListWrapper = styled('nav')(() => ({}));

const FolderList = styled('ul')(() => ({
  width: '100%',
  backgroundColor: 'transparent',
  position: 'relative',
  marginTop: 0,
  padding: 0,
}));
