// formats date from "yyyy-mm-dd" to "dd-mm-yyyy"
export const formatDate = (datee, trim = true) => {
  const data = Date(datee);
  const formatArray = new Date(data).toUTCString().split(" ");
  const [day, date, month, year] = formatArray;
  const AllData = {
    formatArray,
    allDate: data,
    month,
    day,
    year,
    date,
    date_month: `${date}/${month}`,
  };

  return AllData;
};
