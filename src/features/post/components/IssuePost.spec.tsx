import { render, screen } from '@testing-library/react';

import { IssuePost } from './IssuePost';

describe('IssuePost', () => {
  it('should render CTA link with prefilled GitHub issue query', () => {
    render(<IssuePost title="테스트 포스트" />);

    const link = screen.getByRole('link', {
      name: '📮 이 포스트에 관심 있으신가요? 이슈를 남겨주세요! 👍',
    });

    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://github.com/1ilsang/dev/issues/new?'),
    );
    expect(link.getAttribute('href')).toContain(
      'title=[🧊] %ED%85%8C%EC%8A%A4%ED%8A%B8%20%ED%8F%AC%EC%8A%A4%ED%8A%B8',
    );
    expect(link.getAttribute('href')).toContain('assignees=1ilsang');
    expect(link.getAttribute('href')).toContain('labels=🧊 comment');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
