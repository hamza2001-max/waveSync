export interface IModal {
  clickable: string;
  className?: string;
  children: React.ReactNode;
}

export interface IAccordian {
  title: string;
  bodyVisible: boolean;
  onClick: () => void
  children: React.ReactNode;
}
