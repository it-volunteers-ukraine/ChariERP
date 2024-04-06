import { ChildrenProps } from '@/types';

export default function Layout({ children }: ChildrenProps) {
  return <main className="bg-slate-500">{children}</main>;
}
