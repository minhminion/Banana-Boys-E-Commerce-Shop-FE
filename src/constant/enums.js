import httpStatus from "http-status";

export const Gender = {
  Male: 0,
  Female: 1,
  Other: 2,
};

export const MethodOfPayment = {
  COD: 0,
  BK: 1,
};

export const NotificationType = {
  General: 0,
  Sale: 1,
  Bill: 2,
};

export const OrderStatus = {
  New: 0,
  Processing: 1,
  Delivering: 2,
  Canceled: 3,
  Boom: 4,
  Succeeded: 5,
};

export const PriceCurrency = {
  Dollar: 0,
  VND: 1,
};

export const RoleNameEnum = {
  Customer: 0,
  Admin: 1,
  Shipper: 2,
  StorageManager: 3,
  Manager: 4,
};

export const ShipperStatus = {
  Online: 0,
  Delivering: 1,
  Offline: 2,
};

export const UserStatus = {
  New: 0,
  Banned: 2,
  Verified: 1,
};

export const ProductUnit = [
  {
    id: 1,
    content: 'Each'
  },
  {
    id: 2,
    content: 'BundleOfTwo'
  },
  {
    id: 3,
    content: 'BundleOfThree'
  },
  {
    id: 4,
    content: 'BundleOfFour'
  },
  {
    id: 5,
    content: 'BundleOfFive'
  },
  {
    id: 6,
    content: 'G'
  },
  {
    id: 7,
    content: 'Kg'
  },
  {
    id: 8,
    content: 'Pack'
  },
]

export { httpStatus }


