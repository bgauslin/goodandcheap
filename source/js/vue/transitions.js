export default (router) => {
  router.beforeEach((to, from, next) => {
    let direction;

    if (from.name === 'chapters' && to.name === 'chapter') {
      direction = 'forward';
    } else if (from.name === 'chapter' && to.name === 'chapters') {
      direction = 'back';
    } else if (from.name === 'pages' && to.name === 'info') {
      direction = 'forward';
    } else if (from.name === 'info' && to.name === 'pages') {
      direction = 'back';
    } else if (from.name === 'chapter' && to.name === 'intro') {
      direction = 'forward';
    } else if (from.name === 'intro' || from.name === 'ingredients' || from.name === 'steps' ) {
      if (to.name === 'chapter') {
        direction = 'back';
      }
      if (to.name === 'intro' || to.name === 'ingredients' || to.name === 'steps' ) {
        direction = null;
      }
    } else {
      direction = 'up';
    }

    router.app.$store.commit('updateDirection', direction);
    next();
  });
}
