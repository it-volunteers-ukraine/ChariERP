'use client';
import { useState } from 'react';

import { Pagination } from '@/components';

export const DashboardPage = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      <div className="flex flex-col flex-1 bg-white overflow-y-auto rounded-lg shadow-dashboard">
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
        <div className="py-[60px]">DASHBOARD</div>
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
