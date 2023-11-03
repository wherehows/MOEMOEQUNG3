const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, './src/components'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SanityPost {
      publishedAt: Date!
      title: String!
      _updatedAt: Date!
      content: String!
      tags: [Tag!]!
      debts: [Debt!]!
    }

    type Tag {
      _key: String!
      _type: String!
      label: String!
      value: String!
    }

    type Debt {
      _key: String!
      _type: String!
      label: String!
      value: String!
    }
  `);
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const PostDetail = path.resolve(`src/templates/PostDetail.tsx`);
  const Writer = path.resolve(`src/templates/Writer.tsx`);
  const TIL = path.resolve('src/templates/TIL.tsx');
  const Main = path.resolve(`src/templates/Main.tsx`);

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { fileAbsolutePath: { regex: "/(/archive/)/" } }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  createPage({
    path: '/',
    component: Main,
  });

  createPage({
    path: '/writer',
    component: Writer,
  });

  createPage({
    path: '/til',
    component: TIL,
  });

  result.data.allMarkdownRemark.edges.forEach(
    ({
      node: {
        frontmatter: { slug },
      },
    }) =>
      createPage({
        path: slug,
        component: PostDetail,
        context: {
          slug,
        },
      }),
  );
};
