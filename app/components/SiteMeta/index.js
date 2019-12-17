import React from 'react';
import Helmet from 'react-helmet';

export default function renderSiteMeta(props) {
  const {location, title, description, keywords} = props;
  const canonical = location//.toLowerCase();

  return (<Helmet
    link={[{
      href: canonical,
      rel: 'canonical'
    }]}
    meta={[
      {
        name: 'description',
        content: description
      },
      {
        name: 'keywords',
        content: keywords
      }
    ]}
    title={title} />
  );
}