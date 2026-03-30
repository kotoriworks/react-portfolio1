type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  memo: string;
};

let mockData: Customer[] = [
  {
    id: 1,
    name: "山田太郎",
    email: "yamada@example.com",
    company: "ABC株式会社",
    memo: "重要顧客",
  },
  {
    id: 2,
    name: "佐藤花子",
    email: "sato@example.com",
    company: "XYZ株式会社",
    memo: "メール返信待ち",
  },
];

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

// GET
export const fetchCustomers = async () => {
  await sleep(300);
  return [...mockData];
};

// POST
export const createCustomer = async (customer: Omit<Customer, "id">) => {
  await sleep(300);

  const newCustomer = {
    ...customer,
    id: Math.max(0, ...mockData.map((c) => c.id)) + 1,
  };

  mockData.push(newCustomer);
  return newCustomer;
};

// PUT
export const updateCustomer = async (id: number, data: Partial<Customer>) => {
  await sleep(300);

  mockData = mockData.map((c) =>
    c.id === id ? { ...c, ...data } : c
  );
};

// DELETE
export const deleteCustomer = async (id: number) => {
  await sleep(300);

  mockData = mockData.filter((c) => c.id !== id);
};