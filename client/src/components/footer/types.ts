export interface ISocial {
  link: string;
  name?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface INavigate {
  link: string;
  title: string;
}

export interface IConfigFooter {
  social: ISocial[];
  navigate: INavigate[];
}
