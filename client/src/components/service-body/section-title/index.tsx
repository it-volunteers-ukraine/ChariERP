import { getStylesServiceBody } from './style';

interface ISectionTitle {
  text: string;
  type?: string;
  company: string;
  textEnd?: string;
}

export const SectionTitle = ({ company, text, textEnd, type = 'companyStart' }: ISectionTitle) => {
  const { titleSection } = getStylesServiceBody();

  return (
    <>
      {type === 'companyStart' && (
        <div className="m-auto mb-16 flex max-w-[912px] laptop:mb-20 desktop:mb-[88px]">
          <h2 className={titleSection}>
            <span className={`${titleSection} text-dark-blue`}>{company}</span>
            {text}
          </h2>
        </div>
      )}

      {type === 'companyMiddle' && (
        <div className="m-auto mb-16 flex max-w-[700px] laptop:mb-20 desktop:mb-[88px]">
          <h2 className={titleSection}>
            {text}
            <span className={`${titleSection} text-dark-blue`}>{company}</span>
            {textEnd}
          </h2>
        </div>
      )}
    </>
  );
};
