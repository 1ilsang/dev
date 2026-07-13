import { render, screen } from '@testing-library/react';

import { Paragraph, Section, Sentence } from './Body';

describe('Body', () => {
  it('should render Section with top margin class when top is false', () => {
    const { container } = render(
      <ul>
        <Section>내용</Section>
      </ul>,
    );

    expect(container.querySelector('li')).toHaveClass('mt-8');
    expect(screen.getByText('내용')).toBeVisible();
  });

  it('should omit extra top margin when top is true', () => {
    const { container } = render(
      <ul>
        <Section top>상단</Section>
      </ul>,
    );

    expect(container.querySelector('li')).not.toHaveClass('mt-8');
  });

  it('should render Paragraph and Sentence', () => {
    render(
      <Paragraph>
        <Sentence value="첫 문장">추가</Sentence>
      </Paragraph>,
    );

    expect(screen.getByRole('list')).toBeVisible();
    expect(screen.getByRole('listitem')).toHaveTextContent('첫 문장추가');
  });
});
