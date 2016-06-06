angular
  .module('savor.review', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .directive('review', review);

  /**
   * This directive allows us to use the review form template
   */
  function review() {
  return {
    templateUrl: '/views/components/review/review.tpl.html',
    controller: reviewController,
    controllerAs: 'review'
  };
}
