export interface IModal {
  clickable: string;
  className?: string;
  children: React.ReactNode;
}

export interface IAccordian {
  title: string;
  bodyVisible: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface IUserRes {
  message: string;
  formatedData: {
    email: string;
    fullname: string;
    profileImage: string | null;
    username: string;
    createdAt: string;
  };
}

export interface IUser {
  email: string;
  fullname: string;
  profileImage: string | null;
  username: string;
  createdAt: string;
}

export interface IUseUserZus {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}
