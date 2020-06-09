import httpStatus from "http-status";

export const Gender = {
  Male: 0,
  Female: 1,
  Other: 2,
};
export const FilterOrder =
{
    Ascending: 1,
    Descending: 2
}

export const MethodOfPayment = {
  COD: 1,
  BK: 2,
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
  Customer: 1,
  Shipper: 2,
  Admin: 3,
  StorageManager: 4,
  Manager: 5,
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
    content: 'Trái',
    type: 'Each'
  },
  {
    id: 2,
    content: '2 Trái',
    type: 'BundleOfTwo'
  },
  {
    id: 3,
    content: '3 Trái',
    type: 'BundleOfThree'
  },
  {
    id: 4,
    content: '4 Trái',
    type: 'BundleOfFour'
  },
  {
    id: 5,
    content: '5 Trái',
    type: 'BundleOfFive'
  },
  {
    id: 6,
    content: 'G',
    type: 'G'
  },
  {
    id: 7,
    content: 'Kg',
    type: 'Kg'
  },
  {
    id: 8,
    content: 'Túi',
    type: 'Pack'
  },
]

export { httpStatus }


