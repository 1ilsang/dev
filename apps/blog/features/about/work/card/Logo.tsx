import { FunctionComponent } from "react";

import { WorkCardContainerProps } from "./Container";

const CompanyLogo: FunctionComponent<
  Pick<WorkCardContainerProps, "companyHref" | "companyLogoUrl" | "company">
> = ({ companyHref, companyLogoUrl, company }) => {
  return (
    <div>
      <a
        className="hashtag"
        rel="noopener noreferrer"
        target="_blank"
        href={companyHref}
      >
        <img
          className="logo"
          src={companyLogoUrl}
          width="124"
          height="124"
          alt={`${company} logo`}
        />
      </a>
    </div>
  );
};

export default CompanyLogo;
