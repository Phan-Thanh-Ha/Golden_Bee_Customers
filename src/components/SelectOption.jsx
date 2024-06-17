import React from 'react';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { colors } from '../styles/Colors';

const SelectOption = ({ data, onChange, value }) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error('Data is not a valid array:', data);
    return null;
  }

  const selectedIndex = data.findIndex(item => item?.OptionName === value?.OptionName);
  const defaultSelectedIndex = selectedIndex !== -1 ? selectedIndex : 0;
  const selectedIndexPath = new IndexPath(defaultSelectedIndex);

  return (
    <Select
      selectedIndex={selectedIndexPath}
      onSelect={index => {
        const selectedItem = data[index.row];
        onChange(selectedItem); // Truyền đối tượng đã chọn vào onChange
      }}
      value={String(data[selectedIndexPath.row]?.OptionName)}
      style={{ backgroundColor: colors.WHITE }}
    >
      {data.map((item, index) => (
        <SelectItem key={index} title={String(item?.OptionName)} />
      ))}
    </Select>
  );
};

export default SelectOption;
