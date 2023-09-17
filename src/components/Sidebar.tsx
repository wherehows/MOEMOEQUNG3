import styled from '@emotion/styled';
import {
  PADDING_BETWEEN_SIDEBAR_AND_SCROLL,
  SIDEBAR_PURE_WIDTH,
  SIDEBAR_WIDTH,
} from '@/utils/const';
import FolderItem from './FolderItem';
import SidebarHeader from './SidebarHeader';
import { Folder } from '@/types/document';

interface SidebarProps {
  folders: Folder[];
}

const Common = ({ folders }: SidebarProps) => {
  return (
    <SubWrapper>
      <SidebarHeader />
      <FolderListWrapper>
        <FolderList>
          {folders.map((folderInformation, index) => (
            <FolderItem key={index} folderInformation={folderInformation} />
          ))}
        </FolderList>
      </FolderListWrapper>
    </SubWrapper>
  );
};

export const CollapsibleSidebar = ({ folders }: SidebarProps) => (
  <CollapsibleSidebarWrapper>
    <Common folders={folders} />
  </CollapsibleSidebarWrapper>
);

export const FixedSidebar = ({ folders }: SidebarProps) => (
  <FixedSidebarWrapper>
    <Common folders={folders} />
  </FixedSidebarWrapper>
);

const BaseWrapper = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  left: 0,
  overflowY: 'auto',
  position: 'fixed',
  paddingRight: PADDING_BETWEEN_SIDEBAR_AND_SCROLL,
}));

const CollapsibleSidebarWrapper = styled(BaseWrapper)(() => ({
  zIndex: 1,
  top: 0,
  padding: '0 12px',
  backgroundColor: 'var(--dark-background)',
}));

const FixedSidebarWrapper = styled(BaseWrapper)(() => ({
  width: SIDEBAR_WIDTH,
  alignItems: 'flex-end',
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
