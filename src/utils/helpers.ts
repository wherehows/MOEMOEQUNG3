import { Edge, FolderInformation } from '@/types/document';

export const isOnDevelopment = () => process.env.GATSBY_MODE === 'development';

interface FolderNameToFolderInformationMap {
  [key: string]: FolderInformation;
}

export const getFolders = (edges: Edge[]) => {
  const folderNameToFolderInformationMap = edges.reduce(
    (acc: FolderNameToFolderInformationMap, { node }: Edge) => {
      const { frontmatter, html, id } = node;
      const { date, title, subTitle, folder, slug, index } = frontmatter;
      const documentInformation = {
        date,
        folder,
        title,
        subTitle,
        index,
        slug,
        html,
        id,
      };

      if (!Reflect.has(acc, folder)) {
        acc[folder] = {
          folder,
          documents: [documentInformation],
        };
      } else {
        acc[folder].documents.push(documentInformation);
      }

      return acc;
    },
    {},
  );

  return moveTargetToLast(
    moveTargetToLast(
      Object.values(folderNameToFolderInformationMap),
      target => target.folder === 'ETC',
    ),
    target => target.folder === 'Weekly Journal',
  );
};

export const moveTargetToLast = <T>(
  arr: T[],
  matcher: (arg: T) => boolean,
): T[] => {
  const res = [];
  let lastValue = null;

  for (let i = 0; i < arr.length; i++) {
    if (matcher(arr[i])) {
      lastValue = arr[i];
    } else {
      res.push(arr[i]);
    }
  }

  return lastValue ? [...res, lastValue] : res;
};
