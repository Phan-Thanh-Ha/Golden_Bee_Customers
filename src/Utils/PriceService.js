import { FormatMoney } from "./FormatMoney";
import { RoundUpNumber } from "./RoundUpNumber";

function calculateTotalPrice(otherService) {
  if (!otherService || otherService.length === 0) {
    return 0;
  }
  return otherService.reduce((total, detail) => {
    return total + (detail.PriceDetail || 0);
  }, 0);
}

export const priceClearning = (values, price, time) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};
export const priceHourseClearning = (values, price, time) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};

export const priceOfficeClearning = (values, price, time) => {
  const priceServiceDetail = calculateTotalPrice(values?.otherService);
  return price * values?.people * values?.room + priceServiceDetail;
};
export const priceClearningMachine = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};

export const priceClearningAirConditioner = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};

export const priceRepairElectricity = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};

export const priceRepairAirConditioner = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};

export const priceRepairPipe = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};

export const priceRepairCamera = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};

export const priceRepairInterior = (formData, price, time) => {
  return (
    FormatMoney(price * formData?.people) +
    " VNĐ / " +
    RoundUpNumber(time, 1) +
    " giờ"
  );
};
