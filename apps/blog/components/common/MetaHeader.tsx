import Head from "next/head";
import { FunctionComponent } from "react";

interface MetaProps {
  title?: string;
  description?: string;
  ogImageUrl?: string;
  key?: string;
}

const Meta: FunctionComponent<MetaProps> = ({
  title,
  description,
  ogImageUrl,
  key,
}) => {
  return (
    <Head>
      {title && (
        <>
          <title key={key}>{title}</title>
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

export default Meta;
