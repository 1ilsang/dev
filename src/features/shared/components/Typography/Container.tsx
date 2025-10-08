import type {
  FunctionComponent,
  HTMLAttributes,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import { Children, memo, useMemo, isValidElement, Fragment } from 'react';

type TypographyProps = {} & PropsWithChildren;

/**
 * @description Typography 컴포넌트는 중첩된 텍스트의 마크다운 태깅을 무시하고 순수 텍스트로 가져오는 역할을 한다.
 * @example
 *  ```tsx
 *  <Typography>
 *    <span className="text-red-300">
 *      조금 긴 강조텍스트
 *    </span>
 *    일반 텍스트
 *  </Typography>
 * ```
 * 이 경우 span > p > 문자 순으로 파싱되기 때문에 불필요한 p 태그가 생김. 불필요한 태그가 생기지 않게 한다.
 *
 * span 태그만 사용 가능하며 최상위 요소로 사용해야 한다.
 */
export const Typography: FunctionComponent<TypographyProps> = memo(
  ({ children }) => {
    const processedChildren = useMemo(() => {
      return Children.toArray(children).map((child, index) => {
        if (!isValidElement(child)) {
          return child;
        }
        const processedChild = processChild(child);
        return <Fragment key={index}>{processedChild}</Fragment>;
      });
    }, [children]);

    return <p className="mt-4 mb-4">{processedChildren}</p>;
  },
);
Typography.displayName = 'Typography';

/**
 * 단일 자식 요소를 처리하는 함수
 * @param child - 처리할 React 요소
 * @returns 처리된 React 노드
 */
const processChild = (child: ReactElement): ReactNode => {
  if (!isValidElement(child)) {
    return child;
  }

  const deepestChild = getDeepestChild(child);

  if (child.type === 'span' && child.props) {
    const spanProps = child.props as HTMLAttributes<HTMLSpanElement>;
    return <span {...spanProps}>{deepestChild}</span>;
  }

  return deepestChild;
};

/**
 * 중첩된 요소에서 가장 깊은 자식을 안전하게 추출
 * @param element - 탐색할 React 요소
 * @param depth - 현재 탐색 깊이 (무한 루프 방지)
 * @returns 가장 깊은 자식 요소
 */
const getDeepestChild = (element: ReactElement, depth = 0): ReactNode => {
  // 최대 탐색 깊이 제한 (무한 루프 방지)
  if (depth > 10) {
    return element;
  }
  // props가 null이거나 undefined인 경우
  if (!element.props) {
    return element;
  }

  // props 타입을 안전하게 처리
  const props = element.props as { children?: ReactNode };
  if (!props.children) {
    return element;
  }
  const { children } = props;
  // children이 ReactElement인 경우에만 재귀 탐색
  if (isValidElement(children)) {
    return getDeepestChild(children, depth + 1);
  }
  // children이 배열이거나 다른 타입인 경우 그대로 반환
  return children;
};
