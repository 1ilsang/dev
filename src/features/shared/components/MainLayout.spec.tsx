import { render, screen } from '@testing-library/react';

import { MainContainer } from './MainContainer';
import { MainLayout } from './MainLayout';

describe('MainLayout', () => {
  it('should render skip link targeting main content', () => {
    render(
      <MainLayout>
        <MainContainer>page content</MainContainer>
      </MainLayout>,
    );

    expect(
      screen.getByRole('link', { name: '본문으로 건너뛰기' }),
    ).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toHaveTextContent(
      'page content',
    );
  });

  it('should wrap children in main landmark', () => {
    render(
      <MainLayout>
        <div>child</div>
      </MainLayout>,
    );

    expect(screen.getByRole('main')).toHaveTextContent('child');
  });
});
