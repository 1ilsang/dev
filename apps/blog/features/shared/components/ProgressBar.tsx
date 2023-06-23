import { FunctionComponent, useMemo, useState } from "react";

type ProgressBarProps = { value: number; total: number };

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ value, total }) => {
  const [over, setOver] = useState(false);

  const handleMouseOver = () => setOver(true);
  const handleMouseLeave = () => setOver(false);

  const percent = useMemo(
    () => Math.floor((value / total) * 100),
    [value, total],
  );

  return (
    <div
      className="progress small"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <progress max={total} value={value} suppressHydrationWarning />
      {over && (
        <div className="tooltip small">
          프로젝트 기간 / 재직 기간({percent}%)
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
