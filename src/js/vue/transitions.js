export default (router) => {
  router.beforeEach((to, from, next) => {
    let direction = 'up';

    const routeTransition = [
      ['chapter', 'chapters', 'forward'],
      ['chapters', 'chapter', 'back'],
      ['info', 'pages', 'forward'],
      ['pages', 'info', 'back'],
      ['chapter', 'intro', 'back'],
      ['chapter', 'ingredients', 'back'],
      ['chapter', 'steps', 'back'],
      ['intro', 'chapter', 'forward'],
      ['intro', 'ingredients', null],
      ['intro', 'steps', null],
      ['ingredients', 'intro', null],
      ['ingredients', 'steps', null],
      ['steps', 'intro', null],
      ['steps', 'ingredients', null],
    ];

    let i = 0;
    while (i < routeTransition.length) {
      const [to_, from_, direction_] = routeTransition[i];
      if (to_ === to.name && from_ === from.name) {
        direction = direction_;
      }
      i++;
    }
    
    if (router.app.$store) {
      router.app.$store.commit('updateDirection', direction);  
    }
    next();
  });
}
