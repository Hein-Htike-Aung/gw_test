import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
} from "@mui/material";
import React from "react";
import theme from "../../assets/app_theme";

const getStyles = (item: string, items: readonly string[], theme: Theme) => {
  return {
    fontWeight:
      items.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledMultiSelectChip: React.FC<{
  value: string[];
  onChange: (
    event: SelectChangeEvent<string[]>,
    child: React.ReactNode
  ) => void;
  items: string[];
}> = ({ value, onChange, items }) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel>Favorite Items</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Favorite Items" />}
        renderValue={(selected: any) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: any) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {items.map((item) => (
          <MenuItem
            key={item}
            value={item}
            style={getStyles(item, value, theme)}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StyledMultiSelectChip;
