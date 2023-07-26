import { render, screen } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../src/components/RepositoryList';

const repositories = {
  totalCount: 8,
  pageInfo: {
    hasNextPage: true,
    endCursor:
      'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
  },
  edges: [
    {
      node: {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1619,
        stargazersCount: 21856,
        ratingAverage: 88,
        reviewCount: 3,
        ownerAvatarUrl:
          'https://avatars2.githubusercontent.com/u/4060187?v=4',
      },
      cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
    },
    {
      node: {
        id: 'async-library.react-async',
        fullName: 'async-library/react-async',
        description: 'Flexible promise-based React data loader',
        language: 'JavaScript',
        forksCount: 69,
        stargazersCount: 1760,
        ratingAverage: 72,
        reviewCount: 3,
        ownerAvatarUrl:
          'https://avatars1.githubusercontent.com/u/54310907?v=4',
      },
      cursor:
        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
    },
  ],
};


describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {

      render(<RepositoryListContainer repositories={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const first = repositories.edges[0].node;
      const second = repositories.edges[1].node;

      const knum = n => {
        if (n >= 1000)
          return (n-n%100)/1000 + 'k';
        return n;
      }

      const checkFields = (rendered, ref) => {
        expect(rendered).toHaveTextContent(ref.fullName);
        expect(rendered).toHaveTextContent(ref.language);
        expect(rendered).toHaveTextContent(knum(ref.forksCount));
        expect(rendered).toHaveTextContent(knum(ref.stargazersCount));
        expect(rendered).toHaveTextContent(knum(ref.ratingAverage));
        expect(rendered).toHaveTextContent(knum(ref.reviewCount));
      }

      checkFields(firstRepositoryItem, first);
      checkFields(secondRepositoryItem, second);

    });
  });
});
