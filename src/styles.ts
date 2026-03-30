export const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    boxSizing: "border-box" as const,
  },

  title: {
    marginBottom: "10px",
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    flexWrap: "wrap" as const,
  },

  toolbarItem: {
    flex: "1 1 220px",
    minWidth: 0,
  },

  tableWrapper: {
    width: "100%",
    overflowX: "auto" as const,
  },

  table: {
    width: "100%",
    /*minWidth: "720px",*/
    borderCollapse: "collapse" as const,
  },

  row: {
    borderBottom: "1px solid #eee",
  },

  selectedRow: {
    backgroundColor: "#fff8dc",
  },

  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box" as const,
    fontSize: "16px",
  },

  inputEdit: {
    padding: "8px",
    border: "1px solid orange",
    background: "#fff3cd",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box" as const,
    fontSize: "16px",
  },

  select: {
    padding: "8px",
    width: "100%",
    boxSizing: "border-box" as const,
    fontSize: "16px",
  },

  deleteBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    whiteSpace: "nowrap" as const,
  },

  cellText: {
    cursor: "pointer",
    display: "inline-block",
    minWidth: "120px",
    wordBreak: "break-word" as const,
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
    padding: "16px",
    boxSizing: "border-box" as const,
  },

  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "6px",
    width: "100%",
    maxWidth: "360px",
    boxSizing: "border-box" as const,
  },

  toast: {
    position: "fixed" as const,
    top: 20,
    right: 20,
    left: 20,
    padding: "10px 20px",
    color: "#fff",
    borderRadius: "5px",
    boxSizing: "border-box" as const,
  },

  newRowLabel: {
    fontSize: "12px",
    color: "#666",
    whiteSpace: "nowrap" as const,
  },
};

