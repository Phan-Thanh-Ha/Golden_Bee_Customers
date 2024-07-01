import React from 'react';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { colors } from '../styles/Colors';

const SelectOption = ({ data, onChange, value }) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.error('Data is not a valid array:', data);
    return null;
  }

  if (typeof onChange !== 'function') {
    console.error('onChange is not a valid function:', onChange);
    return null;
  }

  const isValidOption = (option) => option && typeof option.OptionName === 'string';

  const selectedIndex = data.findIndex(item => isValidOption(item) && isValidOption(value) && item.OptionName === value.OptionName);
  const defaultSelectedIndex = selectedIndex !== -1 ? selectedIndex : 0;
  const selectedIndexPath = new IndexPath(defaultSelectedIndex);

  return (
    <Select
      selectedIndex={selectedIndexPath}
      onSelect={index => {
        const selectedItem = data[index.row];
        if (isValidOption(selectedItem)) {
          onChange(selectedItem);
        } else {
          console.error('Selected item is not valid:', selectedItem);
        }
      }}
      value={isValidOption(data[selectedIndexPath.row]) ? String(data[selectedIndexPath.row].OptionName) : 'N/A'}
      style={{ backgroundColor: colors.WHITE }}
    >
      {data.map((item, index) => (
        <SelectItem key={index} title={isValidOption(item) ? String(item.OptionName) : 'N/A'} />
      ))}
    </Select>
  );
};

export default SelectOption;
