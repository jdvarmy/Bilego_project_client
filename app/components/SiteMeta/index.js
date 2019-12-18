import React from 'react';
import Helmet from 'react-helmet';

export default function renderSiteMeta(props) {
  const {location, title, description, keywords, opengraph} = props;
  const canonical = location.toLowerCase();

  return (<Helmet
    link={[{
      href: canonical,
      rel: 'canonical'
    }]}
    meta={[
      {name: 'description', content: description},
      {name: 'keywords', content: keywords},

      {property: 'og:locale', content: opengraph && opengraph.locale},
      {property: 'og:type', content: opengraph && opengraph.type},
      {property: 'og:title', content: opengraph && opengraph.title},
      {property: 'og:description', content: opengraph && opengraph.description},
      {property: 'og:site_name', content: opengraph && opengraph.site_name},
      {property: 'og:image', content: opengraph && opengraph.image},
      {property: 'og:image:secure_url', content: opengraph && opengraph.image_secure_url},
      {property: 'og:image:width', content: opengraph && opengraph.image_width},
      {property: 'og:image:height', content: opengraph && opengraph.image_height},
      {property: 'og:url', content: canonical},
    ]}
    title={title} />
  );
}

/*
*
* Мета-теги Open Graph
og:title – заголовок страницы. Для него есть ограничение в 65 символов. Напишите что-то длиннее – текст будет обрезан.
og:type описывает тип объекта на странице (веб-сайт, блог, книга, фильм и т.д.).
og:image — URL изображения, характеризующего страницу.
og:url – адрес сайта.
og:description – краткое описание страницы длиной не более 300 символов.
og:video – если на странице есть видео, здесь прописывается URL.
og:locale – язык страницы (ru_RU, en_GB, de_DE, etc.).
og:site_name – название сайта.
*
*
*
*
*
* */
