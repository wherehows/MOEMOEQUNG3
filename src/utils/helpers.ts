export const isOnDevelopment = () => process.env.GATSBY_MODE === 'development';

export const getFolders = (edges: Edge[]) => {
  const grandParentData: GrandParentData = {};
  const parentData: ParentData = {};

  edges.forEach(({ node }: Edge) => {
    const { frontmatter, html, id } = node;
    const { date, title, subTitle, grandParent, parent, slug, index } =
      frontmatter;
    const childDocument = {
      date,
      grandParent,
      parent,
      title,
      subTitle,
      index,
      slug,
      html,
      id,
    };

    if (!grandParent.length && parent && !(parent in grandParentData)) {
      grandParentData[parent] = {
        grandParent,
        parent,
        children: [childDocument],
      };
      return;
    }

    if (!grandParent.length && parent && parent in grandParentData) {
      grandParentData[parent].children.push(childDocument);
      return;
    }

    if (grandParent.length && parent && !(parent in parentData)) {
      parentData[parent] = {
        grandParent,
        parent,
        children: [childDocument],
      };
      return;
    }

    if (grandParent.length && parent && parent in parentData) {
      parentData[parent].children.push(childDocument);
      return;
    }
  });

  for (const folder of Object.values(parentData)) {
    const { grandParent } = folder;

    if (grandParent && grandParent in grandParentData) {
      grandParentData[grandParent].children.push(folder);
      continue;
    }

    if (grandParent && !(grandParent in grandParentData)) {
      grandParentData[grandParent] = {
        grandfolder: '',
        folder: grandParent,
        children: [folder],
      };
      continue;
    }
  }

  return moveWeeklyJournalToLast(Object.values(grandParentData).reverse());
};

export const moveWeeklyJournalToLast = (
  documentTree: GrandParentData[keyof GrandParentData][],
) => {
  let tempWeeklyJournalToLast = null;

  const res = documentTree.reduce(
    (
      res: GrandParentData[keyof GrandParentData][],
      markdownDocumentNode: GrandParentData[keyof GrandParentData],
    ) => {
      const { parent } = markdownDocumentNode;

      if (parent === 'Weekly Journal') {
        tempWeeklyJournalToLast = markdownDocumentNode;
        return res;
      }

      res.push(markdownDocumentNode);
      return res;
    },
    [],
  );

  tempWeeklyJournalToLast && res.push(tempWeeklyJournalToLast);
  return res;
};
