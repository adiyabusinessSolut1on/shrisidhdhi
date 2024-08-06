const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",

  hour12: true, // time is in 12-hour format with AM/PM
};

const formatDateFun = (dateVal: string | undefined) => {
  const date = new Date(dateVal ?? "");
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export { formatDateFun };
