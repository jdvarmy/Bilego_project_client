import { FrontPage, Offer, Items, Advertising, Events, EventCategory, Concerts, Festivals, Contacts, SingleEvent, SingleItem, Page404, Search } from '../pages';

export default [
  {
    path: '/',
    key: 'FrontPage',
    component: FrontPage,
    exact: true,
  },
  {
    path: '/offer',
    key: 'Offer',
    component: Offer,
    exact: true,
  },
  {
    path: '/advertising',
    key: 'Advertising',
    component: Advertising,
    exact: true,
  },
  {
    path: '/contacts',
    key: 'Contacts',
    component: Contacts,
    exact: true,
  },
  {
    path: '/search',
    key: 'Search',
    component: Search,
    exact: true,
  },
  {
    path: '/events',
    key: 'Events',
    component: Events,
    exact: true,
  },
  {
    path: '/events/concerts',
    key: 'Concerts',
    component: Concerts,
    exact: true,
  },
  {
    path: '/events/festivals',
    key: 'Festivals',
    component: Festivals,
    exact: true,
  },
  {
    path: '/events/:catName',
    key: 'EventCategory',
    component: EventCategory,
    exact: true,
  },
  {
    path: '/items',
    key: 'Items',
    component: Items,
    exact: true,
  },
  {
    path: '/event/:eventSlug',
    key: 'SingleEvent',
    component: SingleEvent,
    exact: true,
  },
  {
    path: '/item/:itemSlug',
    key: 'SingleItem',
    component: SingleItem,
    exact: true,
  },
  {
    path: '*',
    key: 'Page404',
    component: Page404,
  },
];
