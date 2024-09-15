// HomePage.test.js
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from '../components/HomePage';
import useData from '../hooks/useData';
import '@testing-library/jest-dom';
// Mock the `useData` hook
jest.mock('../hooks/useData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock `CategoryMenu`, `NewsCard`, and `MakeMenu` components
jest.mock('../shared/CategoryMenu', () => () => <div>Category Menu</div>);
jest.mock('../shared/NewsCard', () => ({ props }) => <div>{props.title}</div>);
jest.mock('../shared/MakeMenu', () => () => <div>Make Menu</div>);

describe('HomePage', () => {
  beforeEach(() => {
    // Provide a mock implementation of useData
    useData.mockReturnValue({
      news: [
        { id: 1, title: 'News Item 1' },
        { id: 2, title: 'News Item 2' },
        { id: 3, title: 'News Item 3' },
      ],
    });
  });

  test('renders homepage title', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText('Every Type of Car On One Place')).toBeInTheDocument();
  });

  test('renders CategoryMenu component', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText('Category Menu')).toBeInTheDocument();
  });

  test('renders latest news items', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    
    const latestNewsSection = screen.getByText('Latest news').closest('div');
    const newsItems = within(latestNewsSection).getAllByText(/News Item/);
    expect(newsItems).toHaveLength(3);
  });

  test('renders MakeMenu component', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
    expect(screen.getByText('Make Menu')).toBeInTheDocument();
  });
});