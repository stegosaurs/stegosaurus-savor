angular
  .module('savor.user', [])
  .directive('user', user);

  /**
   * This directive allows us to use the review form template
   */
  function user() {
  return {
    templateUrl: '/views/components/user/user.tpl.html',
    controller: userController,
    controllerAs: 'user'
  };
}
