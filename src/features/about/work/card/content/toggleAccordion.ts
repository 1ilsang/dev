export const toggleAccordion = (
  prev: boolean | undefined,
  initiallyOpen: boolean,
): boolean => (prev === undefined ? !initiallyOpen : !prev);
