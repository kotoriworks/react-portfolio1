import { styles } from "../styles";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteModal({ open, onConfirm, onCancel }: Props) {
  if (!open) return null;

  return (
    <div style={styles.modalBg}>
      <div style={styles.modal}>
        <p>削除しますか？</p>
        <button onClick={onConfirm}>OK</button>
        <button onClick={onCancel}>キャンセル</button>
      </div>
    </div>
  );
}