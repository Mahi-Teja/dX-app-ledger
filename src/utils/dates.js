// formats date from "yyyy-mm-dd" to "dd-mm-yyyy"
export const formatDate = (date) => date?.split("-")?.reverse()?.join("-");
