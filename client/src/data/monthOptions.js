export const monthOptions = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const categories = [
  { cat_id: 1, cat_is_income: true, cat_title: 'A' },
  { cat_id: 2, cat_is_income: true, cat_title: 'B' },
  { cat_id: 3, cat_is_income: true, cat_title: 'C' },
];

export const selectionDropDownPutValues = (value) => {
  let options = value?.map((value) => ({
    value: value.catId,
    label: value.catTitle,
  }));
  return options;
};
