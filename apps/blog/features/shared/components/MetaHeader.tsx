import Head from "next/head";
import { FunctionComponent } from "react";

interface MetaProps {
  title?: string;
  description?: string;
  ogImageUrl?: string;
}

const MetaHeader: FunctionComponent<MetaProps> = ({
  title,
  description,
  ogImageUrl,
}) => {
  return (
    <Head>
      {title && (
        <>
          <title key={title}>{title}</title>
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
    </Head>
  );
};

export default MetaHeader;
