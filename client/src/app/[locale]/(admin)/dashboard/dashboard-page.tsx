'use client';
import { useState } from 'react';

import { useWindowWidth } from '@/hooks';
import { Button, Input, Pagination } from '@/components';

export const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const { isMobile } = useWindowWidth();

  return (
    <>
      <div className="flex flex-col flex-1 bg-white overflow-y-auto rounded-lg shadow-dashboard pt-6 pb-8">
        <Input
          type="search"
          name="requisitionSearch"
          label="requisitionSearch"
          wrapperClass="mb-6 max-w-[373px] pl-3 laptop:pl-[32px]"
        />

        <div className="relative flex flex-col px-2 pr-1 laptop:px-[32px] desktop:max-w-[1150px] gap-6 tablet:gap-0 h-full overflow-y-auto scroll-blue">
          {!isMobile && (
            <div className="sticky top-0 left-0 bg-white  w-full border-[1px] border-liteGray p-3 tablet:p-0 tablet:border-t-transparent tablet:border-l-transparent tablet:border-r-transparent tablet:border-b flex gap-3 flex-wrap tablet:flex-nowrap justify-between tablet:justify-start laptop:gap-[20px] hover:bg-superBlue transition-all duration-300 cursor-pointer">
              <div className="tablet:h-[47px] w-full tablet:basis-[552px] tablet:shrink-2 grow overflow-hidden flex items-center">
                <span className="line-clamp-1 overflow-hidden h-[21px]">Назва Організації</span>
              </div>
              <div className="tablet:h-[47px] basis-[calc(33.3%-8px)] grow-0 tablet:basis-[120px] tablet:w-[120px] tablet:shrink-0 flex items-center jus">
                <span>ЄДРПОУ</span>
              </div>
              <div className="tablet:h-[47px] basis-[calc(33.3%-8px)] grow-0 tablet:basis-[74px] tablet:w-[74px] tablet:shrink-0 flex items-center">
                <span>Документ</span>
              </div>
              <div className="tablet:h-[47px] basis-[calc(33.3%-8px)] grow-0 tablet:basis-[106px] tablet:w-[106px] tablet:shrink-0 flex items-center">
                <span>Подачi</span>
              </div>
              <div className="tablet:h-[47px] w-full tablet:basis-[154px] tablet:w-[154px]  grow-0 tablet:shrink-0"></div>
            </div>
          )}

          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={`some-${index}`}
              className="border-[1px] border-liteGray p-3 tablet:p-0 tablet:border-t-transparent tablet:border-l-transparent tablet:border-r-transparent tablet:border-b flex gap-3 flex-wrap tablet:flex-nowrap justify-between tablet:justify-start laptop:gap-[20px] hover:bg-superBlue transition-all duration-300 cursor-pointer"
            >
              <div className="tablet:h-[47px] w-full tablet:basis-[552px] grow flex flex-col items-center justify-center gap-1">
                <span className="line-clamp-1 overflow-hidden tablet:h-[21px] w-full text-center tablet:text-left">
                  Назва Організаціїasdasda sd ad a s asd a dsasdas dads ad adasd a d
                </span>
              </div>
              <div className="tablet:h-[47px] w-full grow-0 tablet:basis-[120px] tablet:w-[120px] tablet:shrink-0 flex flex-col items-center justify-center gap-1">
                {isMobile && <span>ЄДРПОУ</span>}
                <span className="line-clamp-1 overflow-hidden h-[21px] w-full">12345678 Icon asd</span>
              </div>
              <div className="tablet:h-[47px] basis-[calc(50%-8px)] grow-0 tablet:basis-[74px] tablet:w-[74px] tablet:shrink-0 flex flex-col items-center justify-center gap-1">
                {isMobile && <span>Document</span>}
                <span className="line-clamp-1 overflow-hidden h-[21px] w-full">Icon</span>
              </div>
              <div className="tablet:h-[47px] basis-[calc(50%-8px)] grow-0 tablet:basis-[106px] tablet:w-[106px] tablet:shrink-0 flex flex-col items-center justify-center gap-1">
                {isMobile && <span>Подачi</span>}
                <span className="flex items-center w-full overflow-hidden h-[21px]">22.04.19</span>
              </div>
              <div className="tablet:h-[47px] w-full tablet:basis-[154px] grow-0 tablet:shrink-0">
                <div className="flex gap-2 justify-between items-center h-full">
                  <Button isNarrow={!isMobile} styleType="green" text="Accept" />
                  <Button isNarrow={!isMobile} styleType="red" text="Decline" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        total={10000}
        current={page}
        pageSize={100}
        onChange={setPage}
        className="py-16 max-w-[440px] my-auto"
      />
    </>
  );
};
