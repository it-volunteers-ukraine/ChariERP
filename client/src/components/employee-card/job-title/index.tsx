import { EllipsisText } from '@/components';

export const JobTitle = ({ jobTitle }: { jobTitle?: string }) => {
  if (!jobTitle) return null;

  return (
    <div className="w-[max-content] max-w-full rounded-[4px] bg-emeraldGreen p-[4px_6px] leading-[12px] text-white">
      <EllipsisText content={jobTitle}>
        <p className="overflow-hidden text-ellipsis font-robotoCondensed text-xs leading-[12px] text-white">
          {jobTitle}
        </p>
      </EllipsisText>
    </div>
  );
};
