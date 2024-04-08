export interface NavItemType {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  icon_checked: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  route: string;
}
