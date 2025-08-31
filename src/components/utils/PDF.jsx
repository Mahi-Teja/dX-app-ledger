import { jsPDF } from "jspdf";
import { formatDate } from "../../utils/dates";
import { MONTHS_LIST } from "../../utils/constants";

export const generatePDF = (txns) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Transaction Summary", pageWidth / 2, y, { align: "center" });
  y += 15;

  txns.forEach((txn, idx) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    const date = `${new Date(txn.date).getDate()}-${MONTHS_LIST[
      new Date(txn.date).getMonth()
    ].slice(0, 3)}-${new Date(txn.date).getFullYear()}`;

    // Title line: Description (left) and Amount (right)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(40, 40, 40);
    doc.text(txn.description || "—", margin, y);
    doc.setFontSize(12);
    const amountColor =
      txn.type === "expense"
        ? [224, 58, 62] // red
        : txn.type === "income"
        ? [34, 197, 94] // green
        : [41, 128, 185]; // blue for "self"
    doc.setTextColor(amountColor[0], amountColor[1], amountColor[2]);

    doc.text(`${txn.amount.toLocaleString()}`, pageWidth - margin, y, {
      align: "right",
    });
    y += 8;

    // Second line: Date, Type, Category, Account
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    // const typeColor =
    //   txn.type === "expense"
    //     ? [224, 58, 62] // red
    //     : txn.type === "income"
    //     ? [34, 197, 94] // green
    //     : [41, 128, 185]; // blue for "self"

    doc.setTextColor(80, 80, 80);
    doc.text(date, margin, y);

    // doc.setTextColor(typeColor[0], typeColor[1], typeColor[2]);
    doc.text(txn.type.toUpperCase(), margin + 40, y);

    doc.setTextColor(80, 80, 80);
    doc.text(`category: ${txn.category?.name || "N/A"}`, margin + 80, y);
    doc.text(`account: ${txn.account?.name || "N/A"}`, margin + 140, y);
    y += 8;

    // Third line: Tags
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    const tags = txn.tags && txn.tags.length > 0 ? txn.tags.join(", ") : "N/A";
    doc.text(`Tags: ${tags}`, margin, y);

    y += 12; // space before next txn
  });

  doc.save("transactions.pdf");
};
