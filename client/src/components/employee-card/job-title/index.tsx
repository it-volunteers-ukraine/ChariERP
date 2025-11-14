import { EllipsisText } from '@/components';

export const JobTitle = ({ jobTitle }: { jobTitle?: string }) => {
  if (!jobTitle) {
    return null;
  }

  return (
    <div className="bg-emerald-green w-max max-w-full rounded-[4px] p-[4px_6px] leading-[12px] text-white">
      <EllipsisText content={jobTitle}>
        <p className="font-roboto-condensed truncate overflow-hidden text-xs leading-[12px] text-ellipsis text-white">
          {jobTitle}
        </p>
      </EllipsisText>
    </div>
  );
};
