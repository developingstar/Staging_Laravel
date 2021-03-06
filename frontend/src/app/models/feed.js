(function () {
  'use strict';

  /*
   * Feed model
   */
  angular
    .module('zoomtivity')
    .factory('Feed', Feed);

  /** @ngInject */
  function Feed($resource, API_URL) {
    return $resource(API_URL + '/feeds', {}, {
      query: {
        url: API_URL + '/feeds',
        isArray: false,
        ignoreLoadingBar: true
      },
      comments: {
        url: API_URL + '/comments',
        ignoreLoadingBar: true
      },
      reviews: {
        url: API_URL + '/reviews',
        ignoreLoadingBar: true
      }
    });
  }

})();
