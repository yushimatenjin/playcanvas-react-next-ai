export const NUM_SHAPES = 60;

export const SHAPES = [...Array(NUM_SHAPES)].map(() => ({
  scale: [0.5, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)] * 2,
}));

export const rand = (range: number) => range * (0.5 - Math.random());