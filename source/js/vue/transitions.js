export default (router) => {

  router.beforeEach((to, from, next) => {
    let direction;

    // chapters => chapter
    if (from.name === 'chapters' && to.name === 'chapter') {
      direction = 'forward';
    // chapter => chapters
    } else if (from.name === 'chapter' && to.name === 'chapters') {
      direction = 'back';
    // pages => info
    } else if (from.name === 'pages' && to.name === 'info') {
      direction = 'forward';
    // info => pages
    } else if (from.name === 'info' && to.name === 'pages') {
      direction = 'back';
    // chapter => recipe
    } else if (from.name === 'chapter' && to.name === 'intro') {
      direction = 'forward';
    } else if (from.name === 'intro' || from.name === 'ingredients' || from.name === 'steps' ) {
      // recipe => chapter
      if (to.name === 'chapter') {
        direction = 'back';
      }
      // recipe tabs
      if (to.name === 'intro' || to.name === 'ingredients' || to.name === 'steps' ) {
        direction = null;
      }
    // default
    } else {
      direction = 'up';
    }

    router.app.$store.commit('direction', direction);
    next();
  });
}
