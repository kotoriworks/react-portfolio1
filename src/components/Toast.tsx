import { styles } from "../styles";
import type { ToastType } from "../types";

type Props = {
  toast: ToastType | null;
};

export function Toast({ toast }: Props) {
  if (!toast) return null;

  return (
    <div
      style={{
        ...styles.toast,
        background: toast.type === "success" ? "#4caf50" : "#f44336",
      }}
    >
      {toast.message}
    </div>
  );
}