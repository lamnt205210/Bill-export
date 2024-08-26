import dayjs from "dayjs";
const DateForm = (invoiceDate) => {
  return `${dayjs(invoiceDate).format("DD/MM/YYYY")}`;
};
export { DateForm };
