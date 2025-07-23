import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import CustomTheme from "../../theme/CustomTheme.jsx";

const DateDropdown = ({ selectedDate, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dateOptions = ["Day", "Week", "Month", "Year"];

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDown />}
        sx={{
          backgroundColor: CustomTheme.palette.background.paper,
          color: CustomTheme.palette.text.primary,
          textTransform: "none",
          fontSize: CustomTheme.typography.body1.fontSize,
          padding: CustomTheme.spacing(1, 2),
          borderRadius: CustomTheme.shape.borderRadius,
          border: `1px solid ${CustomTheme.palette.primary.main}`,
          "&:hover": {
            backgroundColor: CustomTheme.palette.primary.light,
          },
        }}
      >
        {selectedDate}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {dateOptions.map((date) => (
          <MenuItem
            key={date}
            onClick={() => {
              onChange(date);
              handleClose();
            }}
            selected={selectedDate === date}
            sx={{
              "&.Mui-selected": {
                backgroundColor: CustomTheme.palette.primary.light,
              },
            }}
          >
            {date}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DateDropdown;
