export interface PasswordType {
  oldPassword: string;
  newPassword: string;
}

export interface WithdrawModalProps {
  children: React.ReactNode;
}

export interface WithdrawRequestBodyType {
  withdrawReason: string;
}
