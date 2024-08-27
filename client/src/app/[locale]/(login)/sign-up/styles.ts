export const getStyles = () => {
  const baseTextStyles = 'leading-4 text-[13px] tracking-[.25px] tablet:leading-5 tablet:text-[14px]';

  return {
    spanStyles: baseTextStyles,
    spanStylesForExample: `italic font-medium ${baseTextStyles}`,
  };
};
