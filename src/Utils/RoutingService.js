import { ScreenNames } from "../Constants";

const serviceRoutes = {
  7: ScreenNames.FORM_CLEARNING, // giúp việc
  8: ScreenNames.FORM_HOUSE_CLEARING, // dọn nhà
  9: ScreenNames.FORM_OFFICE_CLEARING, // dọn văn phòng
  10: ScreenNames.FORM_MACHINE_CLEANING, // vệ sinh máy giặt
  11: ScreenNames.FORM_AIR_CONDITIONING, // vệ sinh ddiieuf hòa
  13: ScreenNames.FORM_REPAIR_AIR_CONDITIONING, // sửa ddiieuf hòa
  14: ScreenNames.FORM_INSTALLING, // sửa oonsg nuoc
  15: ScreenNames.FORM_REPAIR_CAMERA, // sửa camera
  16: ScreenNames.FORM_INTERIOR, // sửa nội thất
  12: ScreenNames.FORM_REPAIR_ELECTRICITY, // sửa dien
};

export const getRouterById = (id) => {
  if (serviceRoutes[id]) {
    return serviceRoutes[id];
  } else {
    return ScreenNames.HOME;
  }
};
