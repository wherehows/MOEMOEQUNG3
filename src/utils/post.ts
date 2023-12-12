export type Post = Pick<
  Queries.TypegenPageQuery['postsQueryData']['nodes'][0],
  'title' | 'publishedAt' | '_updatedAt'
> & { slug: string };

export const getCategoryInformation = ({
  nodes,
}: Queries.TypegenPageQuery['postsQueryData']) => {
  const categoryInformation: {
    [slug: string]: Post[];
  } = {};

  for (let i = 0; i < nodes.length; i++) {
    const { title, tags, publishedAt, _updatedAt, slug } = nodes[i];
    const { value: category } = tags[0];
    const post = {
      title,
      publishedAt,
      _updatedAt,
      slug: slug.current,
    };

    if (category in categoryInformation) {
      categoryInformation[category].push(post);
    } else {
      categoryInformation[category] = [post];
    }
  }

  return categoryInformation;
};

export const getAllPosts = (
  postsQueryData: Queries.TypegenPageQuery['postsQueryData'],
) => {
  const { nodes } = postsQueryData;
  const allPosts: Post[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const { title, publishedAt, _updatedAt, slug } = nodes[i];
    const post = {
      title,
      publishedAt,
      _updatedAt,
      slug: slug.current,
    };

    allPosts.push(post);
  }

  return allPosts;
};
