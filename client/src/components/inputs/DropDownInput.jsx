import React from 'react';
import Select from 'react-select';

const DropDownInput = (props) => {
  const customStyles = {
    option: (provided) => ({
      ...provided,
      padding: 10,
    }),
    control: () => ({
      display: 'flex',
      borderWidth: 0,
      justifyContent: 'center',
      padding: 2,
    }),
    menu: (base) => ({ ...base, width: 240, backgroundColor: 'grey' }),
  };

  return (
    <Select
      {...props}
      name={props.name}
      style={customStyles}
      options={props.options}
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
    />
  );
};
export default DropDownInput;
