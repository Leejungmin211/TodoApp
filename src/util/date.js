import dayjs from "dayjs";

export function formattedTimeDate(date) {
  return dayjs(date).format("YYYY.MM.DD HH:mm:ss");
}

export function formattedDate(date) {
  return dayjs(date).format("YYYY년 M월 D일");
}

export function sliceDateSubstring(date) {
  return date.slice(0, 10);
}
