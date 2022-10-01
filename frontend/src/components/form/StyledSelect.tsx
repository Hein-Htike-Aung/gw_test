import { FormControl, InputLabel, Select } from "@mui/material";
import React from "react";

const StyledSelect: React.FC<{
  onChange: (e: any) => void;
  children: React.ReactNode;
  label: string;
  labelId: string;
  name: string;
  value: any;
}> = ({ label, value, name, labelId, onChange, children }) => {
  return (
    <FormControl size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        defaultValue=""
        name={name}
        value={value}
        onChange={onChange}
        sx={{ width: "250px" }}
        labelId={labelId}
        label={label}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default StyledSelect;
