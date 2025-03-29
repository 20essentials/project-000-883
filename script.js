const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

const maxX = document.documentElement.clientWidth - 90;
const minX = 0;
const speed = 10;

const mario = {
  element: document.getElementById('mario'),
  x: 0,
  y: 180,

  update(incX = 0, incY = 0) {
    this.x += incX;
    this.y += incY;

    this.element.dataset.x = this.x;
    this.element.dataset.y = this.y;

    let transform = `translate(${this.x}px, ${this.y}px)`;
    if (this.element.classList.contains('mirror')) transform += ' scaleX(-1)';
    if (this.element.classList.contains('big')) transform += ' scale(2)';

    this.element.style.transform = transform;
  },

  moveRight() {
    this.element.classList.add('caminar');
    this.element.classList.remove('mirror');
    if (this.x < maxX) this.update(speed, 0);
  },

  moveLeft() {
    this.element.classList.add('caminar');
    this.element.classList.add('mirror');
    if (this.x > minX) this.update(-speed, 0);
  },

  release() {
    this.element.classList.remove('caminar');
  }
};

const keyActions = {
  ArrowRight: () => mario.moveRight(),
  ArrowLeft: () => mario.moveLeft(),
  D: () => mario.moveRight(),
  A: () => mario.moveLeft(),
  d: () => mario.moveRight(),
  a: () => mario.moveLeft()
};

window.addEventListener('keydown', e => {
  if (keyActions[e.key]) keyActions[e.key]();
});

window.addEventListener('keyup', () => mario.release());

mario.update();
