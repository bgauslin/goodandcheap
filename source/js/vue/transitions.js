export default (router) => {

  router.beforeEach((to, from, next) => {
    // chapters -> chapter
    if (from.name === 'chapters' && to.name === 'chapter') {
      router.app.$store.commit('direction', 'forward');

    // chapter -> chapters
    } else if (from.name === 'chapter' && to.name === 'chapters') {
      router.app.$store.commit('direction', 'back');

    // pages -> info
    } else if (from.name === 'pages' && to.name === 'info') {
      router.app.$store.commit('direction', 'forward');

    // info -> pages
    } else if (from.name === 'info' && to.name === 'pages') {
      router.app.$store.commit('direction', 'back');

    // chapter -> recipe
    } else if (from.name === 'chapter' && to.name === 'intro') {
      router.app.$store.commit('direction', 'forward');

    } else if (from.name === 'intro' || from.name === 'ingredients' || from.name === 'steps' ) {
      // recipe -> chapter
      if (to.name === 'chapter') {
        router.app.$store.commit('direction', 'back');
      }
      // recipe tabs
      if (to.name === 'intro' || to.name === 'ingredients' || to.name === 'steps' ) {
        router.app.$store.commit('direction', null);
      }
    // default
    } else {
      router.app.$store.commit('direction', 'up');
    }

    next();
  });
}
