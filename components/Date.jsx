import { parseISO, format, isValid } from "date-fns";

const Date = (props) => {
  if (props.date && props.date !== "unset" && isValid(parseISO(props.date))) {
    const date = parseISO(props.date);
    return <time dateTime={props.date}>{format(date, "LLLL d, yyyy")}</time>;
  } else {
    return <p>No date info</p>;
  }
};

export default Date;
