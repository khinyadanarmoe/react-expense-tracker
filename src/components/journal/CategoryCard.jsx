import React from "react";
import { Box, Tooltip, Typography, Card, CardContent } from "@mui/material";
import {
  LocalGroceryStore as GroceriesIcon,
  Lightbulb as UtilitiesIcon,
  DirectionsCar as TransportationIcon,
  Movie as EntertainmentIcon,
  Restaurant as DiningIcon,
  LocalHospital as HealthIcon,
  ShoppingCart as ShoppingIcon,
  Flight as TravelIcon,
  School as EducationIcon,
  Help as MiscIcon,
  Edit as StationeryIcon,
  Hotel as AccommodationIcon,
  Category as DefaultIcon,
} from "@mui/icons-material";
import CustomTheme from "../../theme/CustomTheme.jsx";

const CategoryCard = ({ category, onClick }) => {
  const getIcon = (iconType) => {
    const iconProps = { sx: { fontSize: 24 } };

    switch (iconType) {
      case "groceries":
        return <GroceriesIcon {...iconProps} />;
      case "utilities":
        return <UtilitiesIcon {...iconProps} />;
      case "transportation":
        return <TransportationIcon {...iconProps} />;
      case "entertainment":
        return <EntertainmentIcon {...iconProps} />;
      case "dining":
        return <DiningIcon {...iconProps} />;
      case "health":
        return <HealthIcon {...iconProps} />;
      case "shopping":
        return <ShoppingIcon {...iconProps} />;
      case "travel":
        return <TravelIcon {...iconProps} />;
      case "education":
        return <EducationIcon {...iconProps} />;
      case "misc":
        return <MiscIcon {...iconProps} />;
      case "stationery":
        return <StationeryIcon {...iconProps} />;
      case "accommodation":
        return <AccommodationIcon {...iconProps} />;
      case "default":
      default:
        return <DefaultIcon {...iconProps} />;
    }
  };

  return (
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
            {getIcon(category.icon)}
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
};

export default CategoryCard;
