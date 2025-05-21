export const formatDate = (datee, trim = true) => {
  // console.log("called");

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
  // console.log(formatArray);

  return AllData;
};

// formats date from "yyyy-mm-dd" to "dd-mm-yyyy"
export const formatToIndDate = (date) => {
  const d = new Date(date).toISOString().split("T")[0];
  const NewDateString = d.split("-").reverse().join("/");

  return NewDateString;
};
