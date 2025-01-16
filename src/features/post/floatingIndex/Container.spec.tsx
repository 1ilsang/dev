import { render, screen } from '@testing-library/react';
import { FloatingIndexContainer } from './Container';
import { useRouter } from 'next/navigation';
import userEvent from '@testing-library/user-event';

import type { PostType } from '~/posts/models';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('rendering', () => {
  it('should visible', async () => {
    render(<FloatingIndexContainer toc={MOCK_TOC} />);
    expect(screen.getByLabelText('index')).toBeVisible();
  });

  it('should empty when non-exist heading', async () => {
    render(<FloatingIndexContainer toc={[]} />);
    expect(screen.getByRole('list').childNodes.length).toBe(0);
  });

  it('should rendered nested', async () => {
    render(<FloatingIndexContainer toc={MOCK_TOC} />);
    expect(screen.getAllByRole('list').length).toBe(1);
    expect(screen.getAllByRole('listitem').length).toBe(
      MOCK_H2_COUNT + MOCK_H3_COUNT,
    );
  });
});

describe('event', () => {
  it('should redirect to heading', async () => {
    const replace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace });
    render(<FloatingIndexContainer toc={MOCK_TOC} />);

    await userEvent.click(screen.getByText(MOCK_TOC[2].value));
    expect(replace).toHaveBeenCalledWith(MOCK_TOC[2].id);
  });
});

const MOCK_TOC: PostType['toc'] = [
  { depth: 2, value: 'Index', id: '#index' },
  { depth: 2, value: 'TL;DR!', id: '#tldr' },
  {
    depth: 2,
    value: '1. 개발 서버 실행(서버 초기화)',
    id: '#1-개발-서버-실행서버-초기화',
  },
  {
    depth: 3,
    value: 'Dev Server는 아래와 같은 프로세스를 거치며 초기화를 진행한다.',
    id: '#dev-server는-아래와-같은-프로세스를-거치며-초기화를-진행한다',
  },
  { depth: 2, value: '2. index.html 요청', id: '#2-indexhtml-요청' },
  {
    depth: 2,
    value: '3. index.html 렌더링과 자원 요청',
    id: '#3-indexhtml-렌더링과-자원-요청',
  },
  {
    depth: 2,
    value: '4. 렌더링 계속 진행(with WebSocket)',
    id: '#4-렌더링-계속-진행with-websocket',
  },
  { depth: 2, value: '5. 코드 변경 감지', id: '#5-코드-변경-감지' },
  { depth: 2, value: '6. 브라우저 리렌더링', id: '#6-브라우저-리렌더링' },
  { depth: 2, value: '마무리', id: '#마무리' },
];
const MOCK_H2_COUNT = MOCK_TOC.filter((el) => el.depth === 2).length;
const MOCK_H3_COUNT = MOCK_TOC.filter((el) => el.depth === 3).length;
