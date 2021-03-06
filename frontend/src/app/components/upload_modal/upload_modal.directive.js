(function () {
  'use strict';

  /*
   * Upload modal
   */
  angular
    .module('zoomtivity')
    .directive('uploadModal', uploadModal);

  /** @ngInject */
  function uploadModal($modal) {
    return {
      restrict: 'AE',
      scope: {
        item: '=uploadModal'
      },
      link: UploadModalLink
    };


    /** @ngInject */
    function UploadModalLink(scope, element, attrs, ctrl, transclude) {
      //open modal
      element.click(function () {
        $modal.open({
          templateUrl: '/app/components/upload_modal/upload_modal.html',
          controller: UploadModalController,
          controllerAs: 'modal',
          resolve: {
            spot: function () {
              return scope.item;
            }
          }
        });
      });
    }

    /** @ngInject */
    function UploadModalController($rootScope, spot, $modalInstance, UploaderService, toastr, API_URL) {
      var vm = this;
      vm.close = close;
      vm.upload = upload;
      vm.deletePhoto = deletePhoto;
      vm.images = UploaderService.images;


      //close modal
      function close() {
        $modalInstance.close();
      }

      function upload() {
        var url = API_URL + '/spots/' + spot.id + '/photos';
        UploaderService
          .upload(url)
          .success(function (resp) {
            spot.photos = _.union(spot.photos, resp.photos);
            $rootScope.$emit('jcarousel:change');

            vm.images.files = [];
            toastr.info('Photos successfully uploaded');
            close();
          })
          .catch(function (resp) {
            console.warn(resp);
            toastr.error('Upload error');
          });
      }

      function deletePhoto(idx) {
        vm.images.files.splice(idx, 1);
      }
    }
  }

})
();
