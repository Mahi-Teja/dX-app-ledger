import { v4 as uuidv4 } from "uuid";
import { LayoutGrid } from "lucide-react";

const createCategory = (type, category, Icon) => {
  return {
    type,
    category,
    Icon: Icon || 'LayoutGrid',
    id:uuidv4(),
  };
};

export { createCategory };
