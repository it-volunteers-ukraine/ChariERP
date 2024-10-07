export const requiredUsers = {
  email: 'Email is required',
  password: 'Password is required',
  firstName: 'Name is required',
  lastName: 'Last name is required',
  phone: 'Phone is required',
};

export const requiredUsersUpdate = {
  email: 'Email is required',
  firstName: 'Name is required',
  lastName: 'Last name is required',
  phone: 'Phone is required',
};

interface DataObject {
  [key: string]: string | undefined;
}

export const getErrors = (data: DataObject, requiredUsers: DataObject) =>
  Object.entries(requiredUsers).reduce((acc, [key, value], idx) => {
    if (idx !== 0 && !data[key] && acc) {
      acc += ',';
    }

    if (!data[key]) {
      acc += value;
    }

    return acc;
  }, '');
