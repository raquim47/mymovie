export const hoverItemMotion = {
  initial: {
    scale: 1,
  },
  hovered: {
    scale: 1.2,
    transition: {
      type: 'tween',
      duration: 0.1,
      delay: 0.33,
    },
  },

  pushed: ({ xMove }: { xMove: string }) => ({
    x: xMove,
    transition: {
      type: 'tween',
      duration: 0.1,
      delay: 0.3,
    },
  }),
};
