import React, { useEffect, useState } from "react";
import { TxnItem } from "./transactions/TxnItem";
import { CalendarDays, Clock, Calendar } from "lucide-react"; // Icon pack, can use others
import { getYearGroupedTxns } from "../utils/transactionsData";
import { Pagination } from "./Pagination";

const DateWiseTxn = ({ transactions = [] }) => {
  const [yearWiseTxns, setYearWiseTxns] = useState(transactions || []);

  const groupedTxns = getYearGroupedTxns(transactions);

  useEffect(() => {
    setYearWiseTxns(groupedTxns);
  }, []);

  return (
    <section className="    ">
      <Pagination limit={10} list={transactions} total={transactions.length} />
    </section>
  );
};

export default DateWiseTxn;
// {
//   yearWiseTxns.map((Obj, i) => (
//     <div key={i} className="my-6">
//       <div className="sticky top-0 z-10   backdrop-blur  flex items-center gap-2">
//         <h2 className="text-xl font-semibold px-2 text-gray-700  text-end">
//           Year: {Obj.year}
//         </h2>
//       </div>

//       {Obj?.months?.map((m) => (
//         <div key={`month-${Obj.year}-${m.month}`} className="">
//           {/* Sticky Month Header */}
//           {/* <div className="sticky top-10 z-10 bg-black/80 backdrop-blur border-b py-2 px-4 shadow-sm flex items-center gap-2">
//                 <h3 className="text-xl font-semibold text-blue-600">
//                   Month: {months[m.month]}
//                 </h3>
//               </div> */}

//           <div className="">
//             {m?.days?.map((d, dIdx) => (
//               <div
//                 key={`day-${Obj.year}-${m.month}-${d.day}-${dIdx}`}
//                 className="  p-4 rounded-md "
//               >
//                 <h4 className="text-lg sticky top-7  z-10   backdrop-blur font-medium text-gray-700 mb-2">
//                   {months[m.month]}: {d.day}
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
//                   {d?.txns?.map((tx) => (
//                     <TxnItem key={tx.id} transaction={tx} />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   ));
// }
