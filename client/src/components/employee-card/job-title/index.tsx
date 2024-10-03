export const JobTitle = ({ jobTitle }: { jobTitle?: string }) => {
  if (!jobTitle) return null;

  return (
    <div className="w-[max-content] max-w-full overflow-hidden text-ellipsis rounded-[4px] bg-emeraldGreen p-[4px_6px] leading-[12px] text-white">
      <span className="font-robotoCondensed text-xs leading-[12px] text-white">{jobTitle}</span>
    </div>
  );
};
