import { getStylesServiceBody } from './style';

interface ISectionTitle {
  text: string;
  company: string;
}

export const SectionTitle = ({ company, text }: ISectionTitle) => {
  const { titleSection } = getStylesServiceBody();

  return (
    <div className="m-auto mb-16 flex max-w-[912px] laptop:mb-20 desktop:mb-[88px]">
      <h2 className={titleSection}>
        <span className={`${titleSection} text-dark-blue`}>{company}</span>
        {text}
      </h2>
    </div>
  );
};
