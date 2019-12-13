export default [
  { // 0 - Москва
    id: 0,
    baseName: 'mos',
    cityLabel: 'Москвы',
    cityRus: 'Москва',
    categoryConcerts: 19,
    apiRoot: 'https://mos.bilego.ru/wp-json/bilego/v2',
    mapData: {
      latitude: 55.7528773,
      longitude: 37.5825457
    },
    category: {
      concerts: 19,
      festivals: 42,
      lectures: 38,
      exhibitions: 17,
      children: 18
    }
  },
  { // 1 - Санкт-Петербург
    id: 1,
    baseName: 'spb',
    cityLabel: 'Санкт-Петербурга',
    cityRus: 'Санкт-Петербург',
    categoryConcerts: 4,
    apiRoot: 'https://spb.bilego.ru/wp-json/bilego/v2',
    mapData: {
      latitude: 59.939095,
      longitude: 30.315868
    },
    category: {
      concerts: 4,
      festivals: 27,
      lectures: 23,
      exhibitions: 2,
      children: 3
    }
  }
];
