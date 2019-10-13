export default (router) => {
  router.beforeEach((to, from, next) => {
    let direction = 'up';

    const transition = [
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

    let i = 0;
    while (i < transition.length) {
      const group = transition[i];
      let j = 0;
      while (j < group.toFrom.length) {
        const [to_, from_] = group.toFrom[j];
        if (to_ === to.name && from_ === from.name) {
          direction = group.direction;
        }
        j++;
      }
      i++;
    }

    if (router.app.$store) {
      router.app.$store.commit('updateDirection', direction);  
    }
    next();
  });
}
