import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button1 } from "../buttons/button1";
import { AddCategoryModal } from "../Categories/AddCategory";
import { EmptyWithAction } from "../EmptyFieldText";
import { CategoryIcons, FreeIcons } from "../../utils/icons";
import { FileX, Pencil, Trash2 } from "lucide-react";
import IconButton from "../../utils/IconButton";
import { deleteCategory } from "../../app/state/state.categories";
import { Dialoge } from "../Dialoge";
import toast from "react-hot-toast";

const Categories = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [isOpenDeleteDialouge, setIsOpenDeleteDialouge] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const categories = useSelector((state) => state.categories);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteCategory = () => {
    try {
      if (deleteTarget) {
        dispatch(deleteCategory(deleteTarget.id));
//TODO: delete budget with this category

        toast.success(`Category Deleted`);

        setDeleteTarget(null); // reset
        setIsOpenDeleteDialouge(false); // close dialog
      }
    } catch (error) {
      toast.error("Failled to delete");
      console.error(error);
    }
  };

  return (
    <section className="w-full h-[calc(100vh-64px)] flex flex-col px-4">
      {/* Header */}
      {categories.length > 0 && (
        <header className="w-full flex justify-between items-center px-4   my-2 rounded-lg bg-white shadow-sm flex-shrink-0">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Your Categories
          </h2>
          <Button1
            className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
            handleClick={() => setOpenAddModal(true)}
          >
            Add {FreeIcons.add}
          </Button1>
        </header>
      )}

      {/* Add Category Modal */}
      {openAddModal && (
        <AddCategoryModal
          onClose={() => setOpenAddModal(false)}
          onSuccess={() => setOpenAddModal(false)}
          onCancel={() => setOpenAddModal(false)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {isOpenDeleteDialouge && (
        <Dialoge
          title="Are you sure?"
          description="This action cannot be undone and the data will be lost permanently."
          agreeLabel="Delete"
          disagreeLabel="Cancel"
          onAgree={handleDeleteCategory}
          onDisagree={() => setIsOpenDeleteDialouge(false)}
        />
      )}

      {/* Empty State */}
      {categories.length < 1 ? (
        <EmptyWithAction
          message="No Categories created!"
          icon={FileX}
          buttonText="Add Category"
          onClick={() => setOpenAddModal(true)}
        />
      ) : (
        <div className="flex-1 overflow-auto pb-[3px]">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4 mx-2">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4 hover:shadow-md hover:bg-gray-50 transition"
              >
                {/* Icon & Navigate */}
                <div
                  onClick={() =>
                    navigate(`/category/${cat.category.toLowerCase()}`)
                  }
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 text-2xl cursor-pointer flex-shrink-0"
                >
                  {CategoryIcons[cat?.Icon] || cat?.Icon}
                </div>

                {/* Details */}
                <div className="flex-1 ml-4">
                  <h3 className="text-base font-semibold text-gray-800">
                    {cat.category}
                  </h3>
                  <p
                    className={`inline-flex items-center px-2 py-1 text-xs rounded-full mt-1 
                ${
                  cat.type === "income"
                    ? "bg-green-100 text-green-600"
                    : cat.type === "expense"
                    ? "bg-red-100 text-red-600"
                    : "bg-indigo-100 text-indigo-600"
                }`}
                  >
                    {cat.type}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <IconButton handleClick={() => {}}>
                    <Pencil size={16} />
                  </IconButton>

                  <IconButton
                    handleClick={() => {
                      setDeleteTarget(cat);
                      setIsOpenDeleteDialouge(true);
                    }}
                  >
                    <Trash2 color="red" size={16} />
                  </IconButton>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Categories;
