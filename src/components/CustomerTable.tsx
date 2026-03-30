import type { Customer, EditField } from "../types";
import { styles } from "../styles";
import type { RefObject } from "react";

type Props = {
  filtered: Customer[];
  customers: Customer[];
  selectedRowId: number | "new" | null;
  setSelectedRowId: (id: number | "new" | null) => void;

  editId: number | null;
  editField: EditField;
  editValue: string;
  setEditValue: (value: string) => void;
  startEdit: (customer: Customer, field: EditField) => void;
  updateField: () => void;
  cancelEdit: () => void;
  handleDeleteClick: (id: number) => void;

  newRow: {
    name: string;
    email: string;
    company: string;
    memo: string;
  };
  setNewRow: (value: {
    name: string;
    email: string;
    company: string;
    memo: string;
  }) => void;
  addCustomer: () => void;
  newRowRef: RefObject<HTMLTableRowElement | null>;
};

export function CustomerTable({
  filtered,
  customers,
  selectedRowId,
  setSelectedRowId,
  editId,
  editField,
  editValue,
  setEditValue,
  startEdit,
  updateField,
  cancelEdit,
  handleDeleteClick,
  newRow,
  setNewRow,
  addCustomer,
  newRowRef,
}: Props) {
  const renderEditableCell = (customer: Customer, field: EditField) => {
    if (!field) return null;

    const isEditing = editId === customer.id && editField === field;

    if (isEditing) {
      return (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={updateField}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
            if (e.key === "Escape") {
              cancelEdit();
            }
          }}
          style={styles.inputEdit}
        />
      );
    }

    const value = customer[field];

    return (
      <span onClick={() => startEdit(customer, field)} style={styles.cellText}>
        {value || "　"}
      </span>
    );
  };

  return (
    <div style={styles.tableWrapper}>
    <table style={styles.table}>
      <thead>
        <tr>
          <th>No.</th>
          <th>名前</th>
          <th>メール</th>
          <th>会社</th>
          <th>メモ</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {filtered.map((c) => {
          const isSelected = selectedRowId === c.id;

          return (
            <tr
              key={c.id}
              style={{
                ...styles.row,
                ...(isSelected ? styles.selectedRow : {}),
              }}
              onClick={() => setSelectedRowId(c.id)}
            >
              <td>{c.id}</td>
              <td>{renderEditableCell(c, "name")}</td>
              <td>{renderEditableCell(c, "email")}</td>
              <td>{renderEditableCell(c, "company")}</td>
              <td>{renderEditableCell(c, "memo")}</td>
              <td>
                {isSelected && (
                  <button
                    style={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(c.id);
                    }}
                  >
                    削除
                  </button>
                )}
              </td>
            </tr>
          );
        })}

        <tr
          ref={newRowRef}
          style={{
            ...styles.row,
            ...(selectedRowId === "new" ? styles.selectedRow : {}),
          }}
          onClick={() => setSelectedRowId("new")}
        >
          <td>{customers.length === 0 ? 1 : ""}</td>

          {(["name", "email", "company", "memo"] as const).map((field) => (
            <td key={field}>
              <input
                value={newRow[field]}
                onChange={(e) =>
                  setNewRow({ ...newRow, [field]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomer();
                  }
                }}
                onBlur={(e) => {
                  const next = e.relatedTarget as Node | null;
                  if (
                    newRowRef.current &&
                    next &&
                    newRowRef.current.contains(next)
                  ) {
                    return;
                  }
                  addCustomer();
                }}
                style={styles.input}
              />
            </td>
          ))}

          <td>
            {selectedRowId === "new" && (
              <span style={styles.newRowLabel}>新規入力中</span>
            )}
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}