import { TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import React from "react";

const StyledDesktopDatePicker: React.FC<{
  name: string;
  disabled?: boolean;
  value: Dayjs;
  hasError: boolean;
  errorMessage: string;
  onChange: (value: Dayjs, keyboardInputValue?: string) => void;
  validation?: (e: any) => void;
  width?: number;
  removeWhiteSpace?: boolean;
}> = ({
  name,
  disabled = false,
  hasError,
  validation,
  errorMessage,
  value,
  onChange,
  width,
  removeWhiteSpace = false,
}) => {
  return (
    <DesktopDatePicker
      label=""
      disabled={disabled}
      inputFormat="MM/DD/YYYY"
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          fullWidth
          sx={{
            width: `${width ? width + "rem" : "100%"}`,
          }}
          name={name}
          size="small"
          onBlur={validation}
          helperText={hasError ? errorMessage : !removeWhiteSpace && "\xa0"}
          {...params}
        />
      )}
    />
  );
};

export default StyledDesktopDatePicker;
