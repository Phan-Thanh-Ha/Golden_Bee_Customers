export const FormatTime = (timestamp, type) => {
  // Chuyển đổi timestamp thành đối tượng Date
  const date = new Date(timestamp);

  // Lấy các thành phần của ngày và giờ
  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Định dạng các thành phần ngày và giờ thành chuỗi
  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  // Định dạng chuỗi kết quả theo yêu cầu của type
  if (type === 1) {
    return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}`;
  } else if (type === 2) {
    return `${hoursStr}:${minutesStr}`;
  } else {
    throw new Error(
      'Invalid type parameter. Use 1 for "ngày/tháng/năm giờ:phút" format and 2 for "giờ:phút" format.'
    );
  }
};

// Ví dụ sử dụng
// const timestamp = 1718821492732;
// const type1 = 1;
// const type2 = 2;

// console.log(parseTimestamp(timestamp, type1)); // "23/12/2024 06:38" (ví dụ)
// console.log(parseTimestamp(timestamp, type2)); // "06:38" (ví dụ)
export const parseTimeSql = (time, type) => {
  const date = new Date(time);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Định dạng các thành phần ngày và giờ thành chuỗi
  const dayStr = day < 10 ? `0${day}` : day;
  const monthStr = month < 10 ? `0${month}` : month;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  if (type === 1) {
    return `${dayStr}/${monthStr}/${year} ${hoursStr}:${minutesStr}`;
  } else if (type === 2) {
    return `${hoursStr}:${minutesStr}`;
  } else {
    throw new Error(
      'Invalid type parameter. Use 1 for "ngày/tháng/năm giờ:phút" format and 2 for "giờ:phút" format.'
    );
  }
};

export const FormatDateJson = (date, key = 0) => {
  if (date === undefined) {
    let data = "";
    return data;
  }

  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  // 0 Lấy Tháng/ngày/năm Giờ:phut:Giây
  // 2 Lấy năm/Tháng
  // 3 Lấy ngày/tháng/năm Giờ:phut:Giây
  // 4 Lấy Tháng/Năm
  // 5 Lấy ngày/tháng/năm
  // 6 Lấy ngày/tháng

  if (key === 0)
    return [month, day, year].join("/") + " " + [h, m, s].join(":");
  else if (key === 2) return [year, month].join("-");
  else if (key === 3)
    return [day, month, year].join("/") + " " + [h, m].join(":");
  else if (key === 4) return [month, year].join("-");
  else if (key === 5) return [day, month, year].join("/");
  else if (key === 6) return [day, month].join("-");
  else if (key === 7) return [year, month, day].join("-");
  else if (key === 8)
    return [year, month, day].join("-") + " " + [h, m, s].join(":");
  else if (key === 9) return [day, month].join("/");
  else return [month, day, year].join("/");
};

export function dateTimeFormat(dateTimeString, type) {
  // Tách chuỗi thời gian thành ngày và giờ
  const [datePart, timePart] = dateTimeString.split(" ");

  // Tách phần ngày thành năm, tháng, ngày
  const [year, month, day] = datePart.split("-");

  let formattedDateTime;

  // Xác định định dạng đầu ra dựa trên giá trị của type
  switch (type) {
    case 1:
      // Định dạng ngày/tháng/năm giờ:phút:giây
      formattedDateTime = `${day}/${month}/${year} ${timePart}`;
      break;
    case 2:
      // Định dạng ngày/tháng/năm giờ:phút
      formattedDateTime = `${day}/${month}/${year} ${timePart.slice(0, 5)}`;
      break;
    case 3:
      // Định dạng ngày/tháng/năm
      formattedDateTime = `${day}/${month}/${year}`;
      break;
    default:
      // Định dạng mặc định nếu type không hợp lệ
      formattedDateTime = `${day}/${month}/${year} ${timePart}`;
      break;
  }

  return formattedDateTime;
}
// Ví dụ sử dụng
// const timestamp = 1718821492732;
// const type1 = 1;
// const type2 = 2;
import { format } from "date-fns";

export const parseTimeBE = (time, type) => {
  const date = new Date(time);
  if (type === 1) {
    return format(date, "dd/MM/yyyy HH:mm");
  } else if (type === 2) {
    return format(date, "HH:mm");
  } else {
    throw new Error("sai định dạng");
  }
};
