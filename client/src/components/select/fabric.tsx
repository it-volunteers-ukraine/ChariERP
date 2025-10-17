// // GroupedSelect.tsx

// import { BaseSelect } from './variant';

// type VariantKey = 'default' | 'search' | 'added';

// type GroupedSelectProps = {
//   options: any;
//   onChange: (v: any) => void;
//   variant?: VariantKey;
// };

// const variantsMap: Record<VariantKey, any> = {
//   default: BaseSelect,
//   //   added: AddedSelect,
// };

// export const GroupedSelect = ({ options, onChange, variant = 'default' }: GroupedSelectProps) => {
//   console.log(options);

//   const Component = variantsMap[variant] || variantsMap.default;

//   return <Component options={options} onChange={onChange} />;
// };
