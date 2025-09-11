import { LayoutGrid } from "lucide-react";

const createCategory = (type, category, Icon) => {
  return {
    type,
    category,
    Icon: Icon || 'LayoutGrid',
    id: crypto.randomUUID(),
  };
};

export { createCategory };
