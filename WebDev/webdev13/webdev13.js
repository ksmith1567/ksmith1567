import {
    createTimeline,
    stagger,
    utils,
  } from 'https://assets.codepen.io/1137/anime.esm.min.js';
  
  const count = 2300;
  const duration = 7500;
  const distance = 20;
  const angle = utils.mapRange(0, count, 0, Math.PI * 50);
  
  for (let i = 0; i < count; i++) {
    const $el = document.createElement('div');
    const hue = utils.round(360 / count * i, 0);
    utils.set($el, { background: `hsl(${hue}, 60%, 60%)` });
    document.body.appendChild($el);
  }
  
  createTimeline()
  .add('div', {
    x: (_, i) => `${Math.sin(angle(i)) * distance}rem`,
    y: (_, i) => `${Math.cos(angle(i)) * distance}rem`,
    scale: [0, .4, .2, .6, 0],
    playbackEase: 'inOutSine',
    loop: true,
    duration,
  }, stagger([0, duration]))
  .init()
  .seek(10000);
  