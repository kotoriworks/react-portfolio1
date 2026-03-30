export type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  memo: string;
};

export type EditField = "name" | "email" | "company" | "memo" | null;

export type ToastType = {
  message: string;
  type: "success" | "error";
};