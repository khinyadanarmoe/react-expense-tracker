import React from "react";
import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import CustomTheme from "../../theme/CustomTheme.jsx";

const CategoryCard = ({ category, onClick }) => (
  <Tooltip
    title="Click to add a new expense to this category"
    arrow
    placement="bottom"
    enterDelay={300}
    leaveDelay={100}
  >
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: CustomTheme.shadows[3],
        },
        border: `1px solid ${CustomTheme.palette.secondary.main}`,
        backgroundColor: CustomTheme.palette.background.paper,
        borderRadius: CustomTheme.shape.borderRadius,
        minHeight: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => onClick(category)}
    >
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: CustomTheme.shape.borderRadius / 2,
            backgroundColor: category.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 8px",
            color: "white",
          }}
        >
          {category.icon}
        </Box>
        <Typography
          variant="body2"
          fontWeight="medium"
          color={CustomTheme.palette.text.primary}
        >
          {category.label}
        </Typography>
      </CardContent>
    </Card>
  </Tooltip>
);

export default CategoryCard;
