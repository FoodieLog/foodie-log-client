export interface HeaderProps {
  title: string;
  back: "preComponent" | "prePage";
  option?: string;
}

export type ButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  variant?: "primary" | "secondary" | "text";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
};

export interface ModalProps {
  children: React.ReactNode;
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  reload?: boolean;
}

export interface DialogConfirmProps {
  content: string;
  isOpened: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface DialogReportProps {
  id: number;
  name: string;
  type: string;
  isOpened: boolean;
  onClose: () => void;
}

export interface DialogProps {
  name: string;
  option: string;
  id?: number;
  type?: string;
  content?: string;
  removeHandler?: () => void;
  className?: string;
}

export interface ImageComponentProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}
