export interface PasswordType {
  oldPassword: string;
  newPassword: string;
}

export interface WithdrawRequestBodyType {
  withdrawReason: string;
}

export interface WithDrawReasonType {
  id: string;
  reason: string;
}

export type Notification = {
  [key: string]: "Y" | "N";
};
