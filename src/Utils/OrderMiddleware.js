import { useSelector } from "react-redux";

/**
 * Custom hook to filter orders by OrderId and keep the real-time updates
 * @param {string} orderId - The OrderId to filter
 * @returns {object|null} - The filtered order object or null if not found
 */
export const useFilteredOrderById = (orderId) => {
  const myOrdersAccepted = useSelector((state) => state.main.myOrdersAccepted);

  return myOrdersAccepted.find((order) => order.OrderId === orderId) || null;
};

export const shallowEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
};
