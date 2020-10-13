import { chainer } from '../src';

describe('with function should work', () => {
  it('works', async () => {
    const funcA = async () => ({
      a: 'b',
    });

    const funcB = async (a: { a: string }): Promise<{ c: string }> => ({
      c: a.a + 'd',
    });

    const funcC = async (c: { a: string }) => ({
      e: c.a + 'g',
    });

    const result = await chainer(funcA)
      .with(funcB)
      .with(funcC)
      .with(async () => {
        return {
          f: 'g',
        };
      })
      .run();

    expect(result).toEqual({ a: 'b', c: 'bd', e: 'bg', f: 'g' });
  });
});

describe('then function should work', () => {
  it('works', async () => {
    const funcA = async () => ({
      a: 'b',
    });

    const funcB = async (a: { a: string }): Promise<{ c: string }> => ({
      c: a.a + 'd',
    });

    const funcC = async (c: { a: string }) => ({
      e: c.a + 'g',
    });

    const result = await chainer(funcA)
      .with(funcB)
      .with(funcC)
      .then(async () => {
        return {
          f: 'g',
        };
      });

    expect(result).toEqual({ f: 'g' });
  });
});
