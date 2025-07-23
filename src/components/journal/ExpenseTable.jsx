import React, { useMemo } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CustomTheme from "../../theme/CustomTheme.jsx";

const ExpenseTable = ({ expenses = [] }) => {
  const headerCellStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: CustomTheme.palette.primary.contrastText,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  // Filter expenses to show only last 7 days
  const last7DaysExpenses = useMemo(() => {
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 6);

    return expenses
      .filter((expense) => {
        // Handle both formatted date strings and ISO date strings
        let expenseDate;

        if (typeof expense.date === "string") {
          // Check if it's a formatted date like "16 Jul 2025" or ISO date
          if (expense.date.includes(" ")) {
            // Parse formatted date like "16 Jul 2025"
            expenseDate = new Date(expense.date);
          } else {
            // Parse ISO date
            expenseDate = new Date(expense.date);
          }
        } else {
          expenseDate = new Date(expense.date);
        }

        // Reset time to compare only dates
        const expenseDateOnly = new Date(
          expenseDate.getFullYear(),
          expenseDate.getMonth(),
          expenseDate.getDate()
        );
        const nowDateOnly = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );
        const sevenDaysAgoDateOnly = new Date(
          sevenDaysAgo.getFullYear(),
          sevenDaysAgo.getMonth(),
          sevenDaysAgo.getDate()
        );

        return (
          expenseDateOnly >= sevenDaysAgoDateOnly &&
          expenseDateOnly <= nowDateOnly
        );
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // Sort by newest first
      });
  }, [expenses]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: CustomTheme.shadows[1],
        borderRadius: CustomTheme.shape.borderRadius,
        backgroundColor: CustomTheme.palette.background.paper,
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: CustomTheme.palette.primary.dark }}>
            <TableCell sx={headerCellStyle}>Date</TableCell>
            <TableCell sx={headerCellStyle}>Category</TableCell>
            <TableCell sx={headerCellStyle}>Description</TableCell>
            <TableCell sx={headerCellStyle}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {last7DaysExpenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                <Typography
                  variant="body1"
                  color={CustomTheme.palette.text.secondary}
                >
                  No expenses recorded in the last 7 days. Add your first
                  expense above!
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            last7DaysExpenses.map((expense, index) => (
              <TableRow
                key={expense.id || index} // Use expense.id or fallback to index
                sx={{
                  backgroundColor: CustomTheme.palette.background.paper,
                }}
              >
                <TableCell
                  sx={{
                    fontWeight: "medium",
                    color: CustomTheme.palette.text.primary,
                  }}
                >
                  {/* Format date for display */}
                  {new Date(expense.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: "medium",
                        color: CustomTheme.palette.text.primary,
                      }}
                    >
                      {expense.category}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell
                  sx={{
                    fontStyle:
                      expense.description === "Add more items" ||
                      expense.description === ""
                        ? "italic"
                        : "normal",
                    color:
                      expense.description === "Add more items" ||
                      expense.description === ""
                        ? CustomTheme.palette.text.secondary
                        : CustomTheme.palette.text.primary,
                  }}
                >
                  {expense.description || "No description"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: CustomTheme.palette.text.primary,
                  }}
                >
                  {formatCurrency(expense.amount)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Table Footer with Summary */}
      {last7DaysExpenses.length > 0 && (
        <Box
          sx={{
            p: 2,
            backgroundColor: CustomTheme.palette.background.default,
            borderTop: `1px solid ${CustomTheme.palette.secondary.main}`,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              color={CustomTheme.palette.text.secondary}
            >
              Last 7 Days: {last7DaysExpenses.length} items
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: CustomTheme.palette.primary.contrastText,
              }}
            >
              Total:{" "}
              {formatCurrency(
                last7DaysExpenses.reduce(
                  (sum, expense) => sum + expense.amount,
                  0
                )
              )}
            </Typography>
          </Box>
        </Box>
      )}
    </TableContainer>
  );
};

export default ExpenseTable;
