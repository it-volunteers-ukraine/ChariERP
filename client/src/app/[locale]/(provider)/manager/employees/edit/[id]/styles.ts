import clsx from 'clsx';

export const getStyles = (isCreate?: boolean) => ({
  btnWrapper: clsx('flex flex-col tablet:flex-row items-center gap-3 tablet:gap-6', {
    'justify-end': isCreate,
    'tablet:justify-between': !isCreate,
  }),
  btn: 'uppercase w-full tablet:w-fit',
});
