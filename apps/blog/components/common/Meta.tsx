import { FunctionComponent } from "react";

interface MetaProps {
  title?: string;
  description?: string;
  ogImageUrl?: string;
}

const Meta: FunctionComponent<MetaProps> = ({
  title,
  description,
  ogImageUrl,
}) => {
  return (
    <>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
        </>
      )}
      {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}
      {description && (
        <>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
        </>
      )}
    </>
  );
};

export default Meta;
