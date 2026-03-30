export const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },
  title: {
    marginBottom: "10px",
  },
  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  row: {
    borderBottom: "1px solid #eee",
  },
  selectedRow: {
    backgroundColor: "#fff8dc",
  },
  input: {
    padding: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  inputEdit: {
    padding: "4px",
    border: "1px solid orange",
    background: "#fff3cd",
  },
  select: {
    padding: "4px",
  },
  deleteBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
  },
  cellText: {
    cursor: "pointer",
    display: "inline-block",
    minWidth: "120px",
  },
  modalBg: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
  },
  toast: {
    position: "fixed" as const,
    top: 20,
    right: 20,
    padding: "10px 20px",
    color: "#fff",
    borderRadius: "5px",
  },
  newRowLabel: {
    fontSize: "12px",
    color: "#666",
  },
};