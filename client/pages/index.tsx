import { Inter } from 'next/font/google';
import { Button, LanguageSwitcher } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen bg-[#E9E7E7] gap-5 flex-col items-center p-24 ${inter.className}`}
    >
      <LanguageSwitcher />
      <LanguageSwitcher isNarrow />

      <Button styleType="primary" text="ВІДПРАВИТИ ФОРМУ" />
      <Button styleType="primary" text="ВІДПРАВИТИ ФОРМУ" disabled />
      <Button styleType="primary" text="ВІДПРАВИТИ ФОРМУ" isNarrow />
      <Button styleType="primary" text="ВІДПРАВИТИ ФОРМУ" isNarrow disabled />

      <Button styleType="outline" text="ВІДПРАВИТИ ФОРМУ" />
      <Button styleType="outline" text="ВІДПРАВИТИ ФОРМУ" disabled />
      <Button styleType="outline" text="ВІДПРАВИТИ ФОРМУ" isNarrow />
      <Button styleType="outline" text="ВІДПРАВИТИ ФОРМУ" isNarrow disabled />

      <Button styleType="secondary" text="Реєстрація" />
      <Button styleType="secondary" text="Реєстрація" disabled />
      <Button styleType="secondary" text="Реєстрація" isNarrow />
      <Button styleType="secondary" text="Реєстрація" isNarrow disabled />

      <Button styleType="secondary-outline" text="Реєстрація" />
      <Button styleType="secondary-outline" text="Реєстрація" disabled />
      <Button styleType="secondary-outline" text="Реєстрація" isNarrow />
      <Button
        disabled
        isNarrow
        text="Реєстрація"
        styleType="secondary-outline"
      />
    </main>
  );
}
