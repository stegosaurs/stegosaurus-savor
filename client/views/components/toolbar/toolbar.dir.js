angular
  .module('savor.toolbar', [])
  .directive('toolbar', toolbar);

  /**
   * This directive allows us to use the toolbar
   */
  function toolbar() {
  return {
    templateUrl: '/views/components/toolbar/toolbar.tpl.html',
    controller: toolbarController,
    controllerAs: 'toolbar'
  };
}
