import { Wrapper } from '../wrapper';
import { DotsWrapper } from './dots';
import { FileCardProps } from './types';
import { RenderFile } from './render-file';

export const FileCard = ({ file, preview, removeFile }: FileCardProps) => {
  const formattedDate = new Date().toLocaleDateString();
  const formattedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');

    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Wrapper>
      <div className="relative h-full max-h-[88px] w-full">
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <RenderFile file={file} preview={preview} />
        </div>

        <DotsWrapper removeFile={removeFile} download={() => handleDownload(preview as string, file.name)} />
      </div>

      <div className="flex min-h-[48px] w-full flex-col gap-1 p-[4px_8px_8px]">
        <h1 className="ellipsis overflow-hidden truncate font-roboto text-[14px] font-medium text-darkGray">
          {file.name}
        </h1>

        <div className="flex w-full items-center gap-[20px]">
          <span className="font-roboto text-[10px] leading-[120%]">{formattedDate}</span>

          <span className="font-roboto text-[10px] leading-[120%]">{formattedTime}</span>
        </div>
      </div>
    </Wrapper>
  );
};
