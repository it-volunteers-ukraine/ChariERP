export const getParsedJsonData =
  <T, P>(func: ((params: P) => Promise<string | T>) | (() => Promise<string | T>), params?: P) =>
  async (meta: { signal: AbortSignal }) => {
    if (meta.signal.aborted) throw new Error('Aborted');
    try {
      const data = params
        ? await (func as (params: P) => Promise<string | T>)(params)
        : await (func as () => Promise<string | T>)();

      if (typeof data === 'string') {
        return JSON.parse(data) as T;
      }

      return data as T;
    } catch (error) {
      return Promise.reject(error);
    }
  };
