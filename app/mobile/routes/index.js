import { FrontPage, Offer, Advertising, Events, Contacts, SingleEvent, SingleItem, Page404, Search } from '../pages';

export default function (baseRouter) {
  return(
    [
      {
        path: '/',
        key: 'FrontPage',
        component: FrontPage,
        exact: true,
      },
      {
        path: `/${baseRouter}`,
        key: 'FrontPageCity',
        component: FrontPage,
        exact: true,
      },
      {
        path: `/${baseRouter}/offer`,
        key: 'Offer',
        component: Offer,
        exact: true,
      },
      {
        path: `/${baseRouter}/advertising`,
        key: 'Advertising',
        component: Advertising,
        exact: true,
      },
      {
        path: `/${baseRouter}/contacts`,
        key: 'Contacts',
        component: Contacts,
        exact: true,
      },
      {
        path: `/${baseRouter}/search`,
        key: 'Search',
        component: Search,
        exact: true,
      },
      // {
      //   path: `/${baseRouter}/events`,
      //   key: 'Events',
      //   component: Events,
      //   exact: true,
      // },
      {
        path: `/${baseRouter}/event/:eventSlug`,
        key: 'SingleEvent',
        component: SingleEvent,
        exact: true,
      },
      {
        path: `/${baseRouter}/item/:itemSlug`,
        key: 'SingleItem',
        component: SingleItem,
        exact: true,
      },
      {
        path: '*',
        key: 'Page404',
        component: Page404,
      },
      {
        path: '/404',
        key: 'Page404',
        component: Page404,
      },
    ]
  )
}
