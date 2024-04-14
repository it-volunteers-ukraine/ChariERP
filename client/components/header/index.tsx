import { Icon } from '@/assets';
import {
  Logo,
  Burger,
  Navigation,
  LanguageSwitcher,
  Button,
} from '@/components';

export const Header = ({}) => {
  return (
    <header className="bg-header-gradient py-[19px] desktop:py-[21px]">
      <div className="flex items-center justify-between container-chari gap-8">
        <Logo />

        <Navigation inHeader className="hidden desktop:flex" />

        <div className="flex gap-8 items-center desktop:gap-3">
          <Button
            isNarrow
            text="Реєстрація"
            styleType="secondary"
            className="hidden desktop:flex"
          />

          <Button
            isNarrow
            text="Вхід"
            styleType="outline"
            className="hidden desktop:flex"
          />

          <Icon.Search className="w-[18px] aspect-[1/1] text-white cursor-pointer hover:drop-shadow-sm ml-auto desktop:ml-3 desktop:mr-3" />

          <Burger />

          <LanguageSwitcher isNarrow className="hidden desktop:flex" />
        </div>
      </div>
    </header>
  );
};
