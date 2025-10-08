/* eslint-disable @typescript-eslint/ban-ts-comment */
import { render, screen } from '@testing-library/react';
import { Typography } from './Container';

// TODO: 이거 깨지는거 수정 필요
describe('Typography Component', () => {
  describe('기본 렌더링', () => {
    it('일반 텍스트를 렌더링해야 한다', () => {
      render(<Typography>Test content</Typography>);
      expect(screen.getByText('Test content')).toBeVisible();
    });

    it('p 태그로 감싸진 상태로 렌더링되어야 한다', () => {
      const { container } = render(<Typography>Test content</Typography>);
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
      expect(pElement).toHaveClass('mt-4', 'mb-4');
    });

    it('여러 자식 요소를 처리해야 한다', () => {
      const { container } = render(
        <Typography>
          첫 번째 텍스트
          <span>두 번째 텍스트</span>세 번째 텍스트
        </Typography>,
      );

      // p 태그 전체의 텍스트 내용을 확인
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
      expect(pElement?.textContent).toBe(
        '첫 번째 텍스트두 번째 텍스트세 번째 텍스트',
      );

      // 개별 텍스트 노드들을 확인
      expect(screen.getByText('두 번째 텍스트')).toBeInTheDocument();

      // DOM 구조 확인 - span으로 감싸진 구조가 있는지
      const spans = container.querySelectorAll('span');
      expect(spans.length).toBeGreaterThan(0);
    });
  });

  describe('중첩된 요소 처리', () => {
    it('단순한 span 태그의 내용을 추출해야 한다', () => {
      render(
        <Typography>
          <span className="text-red-300">강조된 텍스트</span>
        </Typography>,
      );

      const spanElement = screen.getByText('강조된 텍스트');
      expect(spanElement).toBeInTheDocument();
      expect(spanElement.tagName).toBe('SPAN');
      expect(spanElement).toHaveClass('text-red-300');
    });

    it('중첩된 요소에서 가장 깊은 내용을 추출해야 한다', () => {
      render(
        <Typography>
          <div>
            <span>
              <em>깊게 중첩된 텍스트</em>
            </span>
          </div>
        </Typography>,
      );

      expect(screen.getByText('깊게 중첩된 텍스트')).toBeInTheDocument();
    });

    it('복잡한 중첩 구조를 처리해야 한다', () => {
      render(
        <Typography>
          <span className="highlight">
            <strong>
              <em>매우 중첩된 강조 텍스트</em>
            </strong>
          </span>
        </Typography>,
      );

      const spanElement = screen.getByText('매우 중첩된 강조 텍스트');
      expect(spanElement).toBeInTheDocument();
      expect(spanElement.tagName).toBe('SPAN');
      expect(spanElement).toHaveClass('highlight');
    });
  });

  describe('span 태그 특별 처리', () => {
    it('span 태그의 props를 유지해야 한다', () => {
      render(
        <Typography>
          <span
            className="custom-class"
            data-testid="custom-span"
            style={{ color: 'red' }}
          >
            스타일된 텍스트
          </span>
        </Typography>,
      );

      const spanElement = screen.getByTestId('custom-span');
      expect(spanElement).toBeInTheDocument();
      expect(spanElement).toHaveClass('custom-class');
      expect(spanElement).toHaveStyle({ color: 'red' });
    });

    it('span이 아닌 태그는 내용만 추출해야 한다', () => {
      const { container } = render(
        <Typography>
          <div className="should-be-ignored">
            <p>div와 p 태그는 무시되고 내용만</p>
          </div>
        </Typography>,
      );

      expect(
        screen.getByText('div와 p 태그는 무시되고 내용만'),
      ).toBeInTheDocument();
      expect(
        container.querySelector('.should-be-ignored'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('빈 children을 처리해야 한다', () => {
      const { container } = render(<Typography></Typography>);
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
      expect(pElement?.textContent).toBe('');
    });

    it('null children을 처리해야 한다', () => {
      const { container } = render(<Typography>{null}</Typography>);
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
    });

    it('undefined children을 처리해야 한다', () => {
      const { container } = render(<Typography>{undefined}</Typography>);
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
    });

    it('props가 null인 요소를 처리해야 한다', () => {
      const ElementWithNullProps = () => null;
      // @ts-ignore - 테스트를 위한 의도적인 타입 무시
      ElementWithNullProps.props = null;

      render(
        <Typography>
          <ElementWithNullProps />
        </Typography>,
      );

      // 에러 없이 렌더링되어야 함
      expect(screen.getByRole('paragraph')).toBeInTheDocument();
    });

    it('매우 깊은 중첩 구조에서 최대 깊이 제한을 적용해야 한다', () => {
      // 15단계 깊이의 중첩 구조 생성 (최대 10단계로 제한됨)
      let nestedElement = <span>깊은 텍스트</span>;
      for (let i = 0; i < 15; i++) {
        nestedElement = <div>{nestedElement}</div>;
      }

      render(<Typography>{nestedElement}</Typography>);

      expect(screen.getByText('깊은 텍스트')).toBeInTheDocument();
    });

    it('혼합된 콘텐츠 타입을 처리해야 한다', () => {
      const { container } = render(
        <Typography>
          일반 텍스트
          <span className="styled">스타일 텍스트</span>
          {42}
          <div>
            <span>중첩된 스타일 텍스트</span>
          </div>
          더 많은 텍스트
        </Typography>,
      );
      /** Expected
       * <p>
          "일반 텍스트"
          <span className="styled">스타일 텍스트</span>
          "42"
          "중첩된 스타일 텍스트"
          "더 많은 텍스트"
        </p>,
       */

      // 전체 p 태그의 텍스트 내용을 확인
      const pElement = container.querySelector('p');
      expect(pElement).toBeInTheDocument();
      expect(pElement?.textContent).toBe(
        '일반 텍스트스타일 텍스트42중첩된 스타일 텍스트더 많은 텍스트',
      );

      // 개별 요소들을 확인 (span 태그는 노드로 분할 되어야 함)
      expect(screen.getByText('스타일 텍스트')).toBeInTheDocument();

      // 스타일된 span의 속성이 유지되는지 확인
      const styledSpan = screen.getByText('스타일 텍스트');
      expect(styledSpan).toHaveClass('styled');

      // 숫자와 일반 텍스트는 전체 컨텐츠에 포함되어 있는지만 확인
      expect(pElement?.textContent).toContain('42');
      expect(pElement?.textContent).toContain('일반 텍스트');
      expect(pElement?.textContent).toContain('더 많은 텍스트');
    });
  });
});
