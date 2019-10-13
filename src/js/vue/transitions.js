export default (router) => {
  router.beforeEach((to, from, next) => {
    let direction = 'up';

    const transitions = [
      {
        direction: 'back',
        toFrom: [
          ['chapter', 'intro'],
          ['chapter', 'ingredients'],
          ['chapter', 'steps'],
          ['chapters', 'chapter'],
          ['pages', 'info'],
        ],
      },
      {
        direction: 'forward',
        toFrom: [
          ['chapter', 'chapters'],
          ['info', 'pages'],
          ['intro', 'chapter'],
        ],
      },
      {
        direction: null,
        toFrom: [
          ['ingredients', 'intro'],
          ['ingredients', 'steps'],
          ['intro', 'ingredients'],
          ['intro', 'steps'],
          ['steps', 'intro'],
          ['steps', 'ingredients'],
        ],
      },
    ];

    transitions.forEach((transition) => {
      transition.toFrom.forEach((route) => {
        const [to_, from_] = route;
        if (to_ === to.name && from_ === from.name) {
          direction = transition.direction;
        }
      });
    });

    if (router.app.$store) {
      router.app.$store.commit('updateDirection', direction);  
    }
    next();
  });
}
