export const getParsedJsonData =
  <T, P extends object = object>(func: ((params: P) => Promise<string>) | (() => Promise<string>), params?: P) =>
  async (meta: { signal: AbortSignal }) => {
    if (meta.signal.aborted) throw new Error('Aborted');

    try {
      const data = params
        ? await (func as (params: P) => Promise<string>)(params)
        : await (func as () => Promise<string>)();

      return JSON.parse(data) as T;
    } catch (error) {
      return Promise.reject(error);
    }
  };
