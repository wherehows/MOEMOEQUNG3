import styled from '@emotion/styled';
import { SIDEBAR_PURE_WIDTH, SIDEBAR_WIDTH } from '@/utils/const';
import FolderItem from './FolderItem';
import SidebarHeader from './SidebarHeader';
import { getFolders } from '@/utils/helpers';
import { Edge } from '@/types/common';

interface SidebarProps {
  edges: Edge[];
}

const Sidebar = ({ edges }: SidebarProps) => {
  const folderInformations = getFolders(edges);

  return (
    <Wrapper>
      <SidebarHeader />
      <FolderListWrapper>
        <FolderList>
          {folderInformations.map((folderInformation, index) => (
            <FolderItem key={index} folderInformation={folderInformation} />
          ))}
        </FolderList>
      </FolderListWrapper>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled('div')(() => ({
  width: SIDEBAR_WIDTH,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  position: 'fixed',
  left: 0,
  overflowY: 'scroll',
}));

const FolderListWrapper = styled('nav')(() => ({}));

const FolderList = styled('ul')(() => ({
  width: SIDEBAR_PURE_WIDTH,
  backgroundColor: 'transparent',
  position: 'relative',
  marginTop: 0,
  padding: 0,
}));
