import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Model } from "../components/utils/Model";
import {
  addBudget,
  updateBudget,
  deleteBudget,
} from "../app/state/state.budgets";
import { CategoryIcons, FreeIcons } from "../utils/icons";
import { Button1 } from "../components/buttons/button1";
import EmptyFieldText, { EmptyWithAction } from "../components/EmptyFieldText";
import toast from "react-hot-toast";
import { getCategoryAndAmount } from "../utils/transactionsData";
import { BUDGET_OCCURENCE } from "../utils/constants";
import { useForm } from "react-hook-form";
import ErrorInput from "../components/utils/ErrorInput";
import { format, isValid } from "date-fns";
import { FileX, LoaderCircle } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import IconButton from "../utils/IconButton";
import { AlertTriangle } from "lucide-react";
import OptionsMenu, { MenuOptions } from "../components/utils/moreOptions";
import { BsThreeDots } from "react-icons/bs";

const BudgetsPage = () => {
  const dispatch = useDispatch();
  const budgets = useSelector((s) => s.budgets);
  const categories = useSelector((s) => s.categories);
  const transactions = useSelector((s) => s.transactions);

  const [newBudget, setNewBudget] = useState({
    categoryId: "",
    allocated: "",
  });
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openAddModel = () => {
    if (categories.length < 1) return toast.error("Need Atleast 1 Category");
    setIsEditOpen(true);
  };
  const openEditor = () => {};

  const calculateBudgetSpent = (budget, transactions) => {
    const normalizeDate = (d) => {
      // to reset time to 00:00hrs
      const date = new Date(d);
      date.setHours(0, 0, 0, 0); // reset time to midnight
      return date.getTime();
    };
    try {
      const { startDate, categoryId } = budget;

      const txns = transactions.filter((t) => {
        const transactionDate = normalizeDate(t.date);
        const budgetStartDate = normalizeDate(startDate);

        // only transactions after creation of budget counts
        return (
          transactionDate >= budgetStartDate && t.category.id === categoryId
        );
      });

      let spent = { income: 0, expense: 0, net: 0 };
      txns.forEach((t) => {
        if (t.type === "expense") {
          spent.expense += t.amount;
        } else if (t.type === "income") {
          spent.income += t.amount;
        }
      });
      spent.net = spent.income - spent.expense;

      return spent;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (budgetToDelete) => {
    dispatch(deleteBudget(budgetToDelete));
  };

  if (budgets.length < 1 && !isEditOpen)
    return (
      <EmptyWithAction
        message="No Budgets created!"
        icon={FileX}
        buttonText="Add Budget"
        onClick={() => {
          categories.length > 0
            ? setIsEditOpen(true)
            : toast.error(
                "You need a category to create a budget. Add one to continue."
              );
        }}
      />
    );

  return (
    <div className="  flex flex-col  pb-18 md:pb-2 h-screen mx-auto px-4 space-y-4">
      <header className="w-full flex justify-between items-center px-4   my-2 rounded-lg bg-white shadow-sm flex-shrink-0">
        <h2 className="text-lg md:text-xl  font-semibold text-gray-800">
          Your Budgets
        </h2>
        <Button1
          className="flex invisible items-center gap-2 px-4 py-2 rounded-lg shadow-sm"
          handleClick={() => {
            setIsEditOpen(true);
          }}
        >
          Add {FreeIcons.add}
        </Button1>
      </header>
      {/* <div className="flex justify-between bg-white p-4 m-4 rounded-xl items-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          My Budgets
        </h2>
      </div> */}

      {isEditOpen && (
        <AddBudgetModel setIsEditOpen={setIsEditOpen} categories={categories} />
      )}

      {/* Budget List */}
      <div className="  h-[calc(100vh-150px)] md:h-[calc(100vh-20px)] mt-4   overflow-y-auto pb-6">
        <div className="grid gap-4 grid-cols-1 mx-2 pb-6 overflow-auto sm:grid-cols-2 md:grid-cols-2">
          {budgets.map((budget) => {
            return (
              <BudgetListItem
                key={budget.id}
                budget={budget}
                transactions={transactions}
                categories={categories}
                calculateBudgetSpent={calculateBudgetSpent}
                handleDelete={handleDelete}
                openEditor={openEditor}
              />
            );
          })}
          <AddBudgetButton handleClick={openAddModel} />
        </div>
      </div>
    </div>
  );
};

const BudgetListItem = ({
  budget,
  transactions,
  categories,
  calculateBudgetSpent,
  openEditor,
  handleDelete,
}) => {
  const [openOptionsMenu, setOpenOptionsMenu] = useState(false);
  const spent = calculateBudgetSpent(budget, transactions);
  const percentage = Math.min((spent.expense / budget.allocated) * 100, 100);
  const isOver = spent.expense > budget.allocated;
  const category = categories.find((c) => c.id === budget.categoryId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-5 rounded-xl shadow-sm bg-white  hover:shadow-md transition flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xl">
            {CategoryIcons[category?.Icon]}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{category?.category}</p>
            <p className="text-xs text-gray-500">
              {budget.isRecurring
                ? budget?.frequency.toLowerCase()
                : "One Time"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p
            className={`font-bold ${
              isOver ? "text-red-600" : "text-green-600"
            }`}
          >
            {spent.expense} / {budget.allocated}
          </p>
        </div>
        <div className="relative">
          <MenuOptions
            customRef={menuRef}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            onEdit={() => openEditor(budget)}
            onDelete={() => handleDelete(budget)}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-[90%] bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all ${
            isOver ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
        <span className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs text-gray-500">
          {percentage.toFixed(0)}%
        </span>
      </div>

      {/* Tags + Notes */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
            Start: {format(budget.startDate, "PP")}
          </span>

          {
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              End: {format(budget.endDate, "PP")}
            </span>
          }

          {budget.priority && (
            <span
              className={`px-2 py-1 rounded-full ${
                budget.priority === "high"
                  ? "bg-red-100 text-red-700"
                  : budget.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {budget.priority.charAt(0).toUpperCase() +
                budget.priority.slice(1)}{" "}
              Priority
            </span>
          )}

          {isOver && (
            <span className="px-2 py-1 rounded-full bg-red-100 text-red-700 flex items-center gap-1">
              <AlertTriangle size={12} /> Over Budget!
            </span>
          )}
        </div>
      </div>

      {/* Notes */}
      {budget.notes && (
        <p className="text-xs text-gray-500 italic border-l-2 pl-2 border-gray-300">
          {budget.notes}
        </p>
      )}
    </div>
  );
};

const AddBudgetButton = ({ handleClick }) => (
  <button
    onClick={handleClick}
    className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-indigo-400 transition"
  >
    <span className="text-3xl text-indigo-500">{FreeIcons.add}</span>
    <span className="text-sm text-gray-500">Add Budget</span>
  </button>
);

const AddBudgetModel = ({ setIsEditOpen, categories }) => {
  const dispatch = useDispatch();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { isRecurring: true } });
  const isRecurring = watch("isRecurring");
  const onSubmit = (data) => {
    try {
      setIsLoading(true);

      const startDate = new Date();

      let endDate = data.isRecurring ? new Date() : new Date(data.startDate);
      if (data.isRecurring) {
        switch (data.frequency.toLowerCase()) {
          case "monthly":
            endDate.setMonth(endDate.getMonth() + 1);
            break;
          case "weekly":
            endDate.setDate(endDate.getDate() + 7);
            break;
          case "yearly":
            endDate.setFullYear(endDate.getFullYear() + 1);
            break;
          default:
            endDate;
        }
      }

      const additional = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      const newBudget = { ...data, ...additional };

      // simulate API if you want
      setTimeout(() => {
        dispatch(addBudget(newBudget));
        toast.success("Budget Created");
        setIsEditOpen(false);
        reset();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Failed to create budget");
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Model setState={setIsEditOpen}>
      <div className="space-y-5 overflow-auto border p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-800">Add New Budget</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("categoryId", { required: true })}
              name="categoryId"
              className="p-3 mt-1 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-gray-600"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
            {errors.categoryId && <ErrorInput>Field required</ErrorInput>}
          </div>

          {/* Allocated Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Allocated Amount <span className="text-red-500">*</span>
            </label>
            <input
              {...register("allocated", { required: true, min: 0 })}
              type="number"
              name="allocated"
              placeholder="Enter amount"
              className="border px-3 py-2 mt-1 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
            />
            {errors.allocated && (
              <ErrorInput>Amount is required and must be positive</ErrorInput>
            )}
          </div>

          {/* Recurring */}
          <div className="flex items-center gap-2">
            <input
              {...register("isRecurring")}
              type="checkbox"
              id="isRecurring"
              className="rounded text-indigo-600"
            />
            <label htmlFor="isRecurring" className="text-sm text-gray-700">
              Is this a recurring budget?
            </label>
          </div>

          {/* Frequency (shown only if recurring) */}
          {isRecurring && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Frequency
              </label>
              <select
                {...register("frequency")}
                name="frequency"
                className="p-3 mt-1 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-gray-600"
              >
                {BUDGET_OCCURENCE.map((occ) => (
                  <option key={occ} value={occ}>
                    {occ}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Start & End Dates */}
          <div className="grid grid-cols-2 gap-3">
            {/* Start Date is for now defauld to creation Date thats whu code is commented */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-600">
                Start Date
              </label>
              <input
                {...register("startDate")}
                type="date"
                className="border px-3 py-2 mt-1 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
              />
            </div> */}
            {!isRecurring && (
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  End Date
                </label>
                <input
                  {...register("endDate")}
                  type="date"
                  className="border px-3 py-2 mt-1 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            )}
          </div>

          {/* Optional Fields (toggle) */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsMoreOpen((pre) => !pre);
            }}
            className="text-sm text-indigo-600 hover:underline"
          >
            {isMoreOpen ? "Hide additional fields" : "Show additional fields"}
          </button>

          {isMoreOpen && (
            <div className="space-y-3">
              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Notes
                </label>
                <input
                  {...register("notes")}
                  type="text"
                  placeholder="Any details about this budget"
                  className="border px-3 py-2 mt-1 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Priority */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-600">
                  Priority
                </label>
                <select
                  {...register("priority")}
                  className="p-3 mt-1 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 text-gray-600"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div> */}

              {/* Reminder */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-600">
                  Reminder Date
                </label>
                <input
                  {...register("reminderDate")}
                  type="date"
                  className="border px-3 py-2 mt-1 rounded-lg w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div> */}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="cursor-pointer font-semibold w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 m-2 rounded-lg"
            >
              {isLoading ? (
                <p className="flex items-center justify-center">
                  Adding
                  <span className="animate-spin">
                    <LoaderCircle />
                  </span>
                </p>
              ) : (
                "Save Budget"
              )}
            </button>

            <Button1
              handleClick={() => setIsEditOpen(false)}
              className="w-full bg-red-400 hover:bg-red-500 text-white py-2 rounded-lg"
            >
              Cancel
            </Button1>
          </div>
        </form>
      </div>
    </Model>
  );
};
export default BudgetsPage;
//         id: Date.now().toString(),
//         categoryId:"someId",
//         allocated: Number(allocated),
//         spent: 0, // dynamicly calculate
//         currency: "inr",
//         isReccurrin: false,
//         frequency: "", // monthly,yearly
//         startDate: "", // when budget starts
//         endDate: "", // useful for reports/comparison later

//         rollover: false, // unused leftover moves to next period?

//         alerts: {
//           enabled: false,
//           threshold: 80, // % at which to alert user
//         },

//         meta: {
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString(),
//           notes: "", // optional description
//         },
