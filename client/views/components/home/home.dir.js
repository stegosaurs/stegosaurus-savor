angular
  .module('savor.home', [])
  .directive('home', home);

  /**
   * This directive allows us to use the review form template
   */
  function home() {
  return {
    templateUrl: '/views/components/home/home.tpl.html',
    controller: homeController,
    controllerAs: 'home'
  };
}
