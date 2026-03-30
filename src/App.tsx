import { useEffect, useRef, useState } from "react";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "./api";
import type { Customer, EditField, ToastType } from "./types";
import { styles } from "./styles";
import { CustomerTable } from "./components/CustomerTable";
import { DeleteModal } from "./components/DeleteModal";
import { Toast } from "./components/Toast";

export default function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newRow, setNewRow] = useState({
    name: "",
    email: "",
    company: "",
    memo: "",
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editField, setEditField] = useState<EditField>(null);
  const [editValue, setEditValue] = useState("");
  const [selectedRowId, setSelectedRowId] = useState<number | "new" | null>(null);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState("id_asc");
  const [isAdding, setIsAdding] = useState(false);
  const [toast, setToast] = useState<ToastType | null>(null);

  const newRowRef = useRef<HTMLTableRowElement | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  useEffect(() => {
    const load = async () => {
      const data = await fetchCustomers();
      setCustomers(data);
    };
    load();
  }, []);

  const addCustomer = async () => {
    if (isAdding) return;
    if (editId !== null) return;

    const hasName = newRow.name.trim() !== "";
    const hasEmail = newRow.email.trim() !== "";
    const hasCompany = newRow.company.trim() !== "";
    const hasMemo = newRow.memo.trim() !== "";

    if (!hasName && !hasEmail && !hasCompany && !hasMemo) return;

    if (!hasName && !hasEmail && !hasCompany && hasMemo) {
      showToast("名前、メール、会社名のいずれかを入力してください", "error");
      return;
    }

    if (hasEmail) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRow.email);
      if (!emailOk) {
        showToast("メールアドレスの形式を確認してください", "error");
        return;
      }
    }

    setIsAdding(true);

    try {
      const created = await createCustomer(newRow);
      setCustomers([...customers, created]);
      setNewRow({ name: "", email: "", company: "", memo: "" });
      setSelectedRowId(created.id);
      showToast("追加しました", "success");
    } catch {
      showToast("追加に失敗しました", "error");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      await deleteCustomer(deleteId);
      setCustomers(customers.filter((c) => c.id !== deleteId));
      if (selectedRowId === deleteId) {
        setSelectedRowId(null);
      }
      setDeleteId(null);
      showToast("削除しました", "success");
    } catch {
      showToast("削除に失敗しました", "error");
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const startEdit = (customer: Customer, field: EditField) => {
    if (!field) return;
    setSelectedRowId(customer.id);
    setEditId(customer.id);
    setEditField(field);
    setEditValue(customer[field]);
  };

  const updateField = async () => {
    if (editId === null || editField === null) return;

    const target = customers.find((c) => c.id === editId);
    if (!target) return;

    if (target[editField] === editValue) {
      setEditId(null);
      setEditField(null);
      setEditValue("");
      return;
    }

    if (editField === "email" && editValue.trim() !== "") {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editValue);
      if (!emailOk) {
        showToast("メールアドレスの形式を確認してください", "error");
        return;
      }
    }

    try {
      await updateCustomer(editId, {
        [editField]: editValue,
      });

      setCustomers(
        customers.map((c) =>
          c.id === editId ? { ...c, [editField]: editValue } : c
        )
      );

      setEditId(null);
      setEditField(null);
      setEditValue("");
    } catch {
      showToast("更新に失敗しました", "error");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditField(null);
    setEditValue("");
  };

  let filtered = customers.filter((c) => {
    const text = searchText.toLowerCase();
    return (
      c.name.toLowerCase().includes(text) ||
      c.email.toLowerCase().includes(text) ||
      c.company.toLowerCase().includes(text) ||
      c.memo.toLowerCase().includes(text)
    );
  });

  filtered = [...filtered].sort((a, b) => {
    switch (sortKey) {
      case "name_asc":
        return a.name.localeCompare(b.name);
      case "name_desc":
        return b.name.localeCompare(a.name);
      case "company_asc":
        return a.company.localeCompare(b.company);
      case "company_desc":
        return b.company.localeCompare(a.company);
      case "email_asc":
        return a.email.localeCompare(b.email);
      case "email_desc":
        return b.email.localeCompare(a.email);
      case "id_desc":
        return b.id - a.id;
      default:
        return a.id - b.id;
    }
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>顧客管理</h2>

<div style={styles.toolbar}>
  <div style={styles.toolbarItem}>
    <input
      placeholder="検索"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      style={styles.input}
    />
  </div>

  <div style={styles.toolbarItem}>
    <select
      value={sortKey}
      onChange={(e) => setSortKey(e.target.value)}
      style={styles.select}
    >
      <option value="id_asc">No昇順</option>
      <option value="id_desc">No降順</option>
      <option value="name_asc">名前昇順</option>
      <option value="name_desc">名前降順</option>
      <option value="company_asc">会社名昇順</option>
      <option value="company_desc">会社名降順</option>
      <option value="email_asc">メール昇順</option>
      <option value="email_desc">メール降順</option>
    </select>
  </div>
</div>

      <CustomerTable
        filtered={filtered}
        customers={customers}
        selectedRowId={selectedRowId}
        setSelectedRowId={setSelectedRowId}
        editId={editId}
        editField={editField}
        editValue={editValue}
        setEditValue={setEditValue}
        startEdit={startEdit}
        updateField={updateField}
        cancelEdit={cancelEdit}
        handleDeleteClick={handleDeleteClick}
        newRow={newRow}
        setNewRow={setNewRow}
        addCustomer={addCustomer}
        newRowRef={newRowRef}
      />

      <DeleteModal
        open={deleteId !== null}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <Toast toast={toast} />
    </div>
  );
}