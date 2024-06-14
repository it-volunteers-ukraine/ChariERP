declare module '*.svg' {
  import * as React from 'react';

  interface SVGProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    className?: string;
    onClick?: React.MouseEventHandler<SVGSVGElement>;
  }

  export const ReactComponent: React.FunctionComponent<SVGProps>;
  const src: string;
  export default src;
}
