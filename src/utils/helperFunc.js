import { format, parseISO } from "date-fns";

const parseAndFormatTimestamp = (timestamp) => {
    const [day, month, year] = timestamp.split("/").map(Number);
    const isoString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dateObject = parseISO(isoString);

    const istDateObject = new Date(dateObject.getTime());

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const differenceInDays = Math.floor((istDateObject - today) / (1000 * 60 * 60 * 24));

    if (differenceInDays === 0) return "Today";
    if (differenceInDays === -1) return "Yesterday";

    return format(istDateObject, "dd/MM/yy");
  };

 export { parseAndFormatTimestamp }; 