import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateTransaction } from "../../app/state/state.transactions";
import { Model } from "../utils/Model";
import { CustomButton1 } from "../buttons/CustomButton1";

export const EditTxn = ({ txn, toggleEdit }) => {
  const accounts = useSelector((s) => s.accounts);
  const categories = useSelector((s) => s.categories);
  const dispatch = useDispatch();

  // ✅ setup RHF with default values
  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      ...txn,
      amount: Number(txn.amount),
    },
  });

  const type = watch("type");
  const TypesOptions = type === "self" ? ["self"] : ["income", "expense"];

  const onSubmit = (data) => {
    data.account = accounts.find((cat) => cat.id === data.account);
    dispatch(updateTransaction({ id: txn.id, updatedTxn: data }));
    toggleEdit(false);
  };

  const handleCancel = () => toggleEdit(false);

  const TYPE_COLORS = {
    income: "bg-green-500 text-white",
    expense: "bg-red-500 text-white",
    self: "bg-indigo-500 text-white",
  };

  return (
    <Model>
      <div
        className="bg-white/50 max-w-lg w-full md:mx-auto p-6 rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
          onClick={handleCancel}
        >
          &times;
        </button>

        <h2 className="text-lg md:text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Transaction
        </h2>

        {/* RHF form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type Selector */}
          <div className="flex justify-between gap-3">
            {TypesOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue("type", t)}
                className={`flex-1 py-2 rounded-lg font-semibold text-center transition-all ${
                  type === t
                    ? TYPE_COLORS[t]
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Description
            </label>
            <input
              {...register("description")}
              placeholder="Transaction description"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              autoFocus
            />
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Amount</label>
              <input
                type="number"
                {...register("amount", { valueAsNumber: true })}
                placeholder="₹0"
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Date</label>
              <input
                type="date"
                {...register("date")}
                className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Category & Account */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            {/* category */}
            {type !== "self" && (
              <div className="flex flex-col">
                <label className="text-gray-700 font-medium mb-1">
                  Category
                </label>
                <select
                  {...register("category")}
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select category</option>
                  {categories?.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {/* account */}
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">Account</label>
              {type !== "self" ? (
                <select
                  {...register("account")}
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option value="">Select account</option>
                  {accounts?.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <select
                    {...register("fromAccount")}
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">From account</option>
                    {accounts?.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                  <select
                    {...register("toAccount")}
                    className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  >
                    <option value="">To account</option>
                    {accounts?.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <CustomButton1 variant="safe" type="submit">
              Save
            </CustomButton1>
            <CustomButton1
              variant="danger"
              type="button"
              handleClick={handleCancel}
            >
              Cancel
            </CustomButton1>
          </div>
        </form>
      </div>
    </Model>
  );
};
