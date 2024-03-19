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
  id?: number;
  name: string;
  option: string;
  feedId?: number;
  replyId?: number;
  type?: string;
  content?: string;
  className?: string;
  removeHandler?: () => void;
}

export interface ImageComponentProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
}
