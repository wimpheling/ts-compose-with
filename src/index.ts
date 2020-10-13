export const chainer = <T extends object>(callback: () => Promise<T>) => {
  return {
    run: () => callback(),
    then: async <U>(nextAction: (arg: T) => Promise<U>) =>
      callback().then(async result => nextAction(result)),
    with: <U>(nextAction: (arg: T) => Promise<U>) => {
      let next = (): Promise<T & U> =>
        callback().then(async result => {
          const newResult = await nextAction(result);
          return {
            ...result,
            ...newResult,
          };
        });
      return chainer(next);
    },
  };
};
