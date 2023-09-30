export interface IModal {
  title: string;
  children: React.ReactNode;
}

export interface IAccordian {
  title: string;
  bodyVisible: boolean;
  onClick: () => void
  children: React.ReactNode;
}
