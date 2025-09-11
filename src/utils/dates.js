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
    string: `${day} ${date} ${month},${year}`,
    date_month: `${date}/${month}`,
  }; 

  return AllData;
};
// date - > "yyyy-mm-dd"
export const formatISODate = (date) =>
  new Date(date).toISOString().split("T")[0];

// formats date from "yyyy-mm-dd" to "dd-mm-yyyy"
export const formatToIndDate = (ISOdate) => {
  const d = new Date(ISOdate).toISOString().split("T")[0];
  const NewDateString = d.split("-").reverse().join("/");

  return NewDateString;
};
