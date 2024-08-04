'use client';
export const JobTitle = ({ jobTitle }: { jobTitle?: string }) => {
  if (!jobTitle) return null;

  return (
    <div className="p-[4px_6px] rounded-[4px] bg-emeraldGreen w-[max-content] leading-[12px]">
      <span className="text-white font-robotoCondensed text-xs leading-[12px]">{jobTitle}</span>
    </div>
  );
};
