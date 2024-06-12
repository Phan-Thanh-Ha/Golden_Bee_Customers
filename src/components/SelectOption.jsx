import React from 'react';
import { Select, SelectItem } from '@ui-kitten/components';
import { colors } from '../styles/Colors';

const SelectOption = ({ data, onChange, value }) => {
  const selectedIndex = data.findIndex(item => item.Name === value);
  const defaultSelectedIndex = selectedIndex !== -1 ? selectedIndex : 0;

  return (
    <Select
      selectedIndex={defaultSelectedIndex}
      onSelect={index => onChange(data[index].Name)}
      value={value}
      style={{ backgroundColor: colors.WHITE }}
    >
      {data.map((item, index) => (
        <SelectItem key={index} title={item.Name} />
      ))}
    </Select>
  );

};

export default SelectOption;
