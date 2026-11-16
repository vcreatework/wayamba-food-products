// Simple illustrated spice shapes, drawn in a 0..100 box centred on 50,50.
// Used for placeholder artwork until real photos are added.
export type ShapeKey =
  | 'quill' | 'seed' | 'clove' | 'pod' | 'nut' | 'blade'
  | 'finger' | 'chilli' | 'powder' | 'grain' | 'leaf';

interface Shape { body: string; detail?: string; highlight?: string }

export const SHAPES: Record<ShapeKey, Shape> = {
  quill: {
    body: 'M8 40 Q8 32 16 32 L84 32 Q92 32 92 40 L92 60 Q92 68 84 68 L16 68 Q8 68 8 60 Z',
    detail: 'M16 38 Q20 50 16 62 M84 38 Q80 50 84 62 M24 44 L76 44 M24 56 L70 56',
    highlight: 'M20 36 L80 36',
  },
  seed: {
    body: 'M50 14 A36 36 0 1 1 49.9 14 Z',
    detail: 'M26 34 Q34 28 42 35 Q50 42 58 33 Q66 26 72 33 M20 52 Q30 45 40 53 Q50 60 60 51 Q70 44 80 51 M28 70 Q37 63 46 70 Q55 77 64 69 Q70 64 74 68',
    highlight: 'M30 24 Q40 18 52 19',
  },
  clove: {
    body: 'M47 40 L53 40 L55 92 Q50 96 45 92 Z M50 8 A14 14 0 1 1 49.9 8 Z M30 30 Q40 22 50 34 Q60 22 70 30 Q66 42 50 44 Q34 42 30 30 Z',
    detail: 'M50 12 L50 30 M42 16 L58 30 M58 16 L42 30',
    highlight: 'M44 12 Q48 10 52 12',
  },
  pod: {
    body: 'M50 6 Q80 26 76 58 Q72 88 50 94 Q28 88 24 58 Q20 26 50 6 Z',
    detail: 'M50 10 Q56 50 50 90 M36 22 Q32 56 40 84 M64 22 Q68 56 60 84',
    highlight: 'M40 20 Q44 14 50 12',
  },
  nut: {
    body: 'M50 10 Q84 14 86 50 Q84 88 50 90 Q16 88 14 50 Q16 14 50 10 Z',
    detail: 'M28 30 Q50 40 72 28 M22 52 Q50 60 78 50 M28 72 Q50 78 72 72 M40 14 Q34 50 42 88 M60 14 Q66 50 58 88',
    highlight: 'M30 22 Q40 16 52 16',
  },
  blade: {
    body: 'M20 80 Q16 50 30 30 Q40 14 54 12 Q48 30 58 38 Q66 20 80 22 Q72 40 82 56 Q70 54 66 70 Q56 60 48 78 Q40 66 34 84 Z',
    detail: 'M30 74 Q40 50 54 20 M48 70 Q60 50 76 30',
  },
  finger: {
    body: 'M12 58 Q14 44 28 44 Q34 30 46 36 Q54 26 64 34 Q78 30 86 42 Q92 54 82 62 Q74 72 60 66 Q50 76 38 68 Q24 74 12 58 Z',
    detail: 'M30 46 L30 66 M48 38 L46 68 M66 36 L64 64',
    highlight: 'M28 48 Q40 40 56 40',
  },
  chilli: {
    body: 'M80 14 Q92 10 90 22 Q84 26 80 22 Q76 40 64 58 Q48 80 18 90 Q12 88 16 82 Q42 70 56 50 Q68 32 72 18 Q74 12 80 14 Z',
    detail: 'M80 14 Q86 6 94 8',
    highlight: 'M66 30 Q60 50 44 66',
  },
  powder: {
    body: 'M6 86 Q20 56 50 40 Q80 56 94 86 Z',
    detail: 'M30 70 A2 2 0 1 0 30.1 70 M50 56 A2 2 0 1 0 50.1 56 M66 72 A2 2 0 1 0 66.1 72 M42 78 A1.6 1.6 0 1 0 42.1 78 M58 64 A1.6 1.6 0 1 0 58.1 64',
    highlight: 'M30 62 Q40 50 50 46',
  },
  grain: {
    body: 'M50 6 Q66 30 64 56 Q60 86 50 94 Q40 86 36 56 Q34 30 50 6 Z',
    detail: 'M50 12 L50 88 M44 22 Q40 54 46 82 M56 22 Q60 54 54 82',
  },
  leaf: {
    body: 'M10 80 Q14 30 60 14 Q92 6 90 12 Q86 52 52 76 Q30 90 10 80 Z',
    detail: 'M12 78 Q46 50 86 14 M30 66 L28 46 M46 54 L48 34 M60 42 L66 26 M38 60 L58 62 M54 48 L72 50',
  },
};

export function shapeOf(key?: string): Shape {
  return SHAPES[(key as ShapeKey) ?? 'seed'] ?? SHAPES.seed;
}
