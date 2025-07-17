import React from "react";
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
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: CustomTheme.shadows[1],
        borderRadius: CustomTheme.shape.borderRadius,
        backgroundColor: CustomTheme.palette.background.paper,
      }}
    >
      {/* Table Header */}

      {/* Table Content */}
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: CustomTheme.palette.primary.dark }}>
            <TableCell
              sx={{
                color: CustomTheme.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Date
            </TableCell>
            <TableCell
              sx={{
                color: CustomTheme.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Category
            </TableCell>
            <TableCell
              sx={{
                color: CustomTheme.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Description
            </TableCell>
            <TableCell
              sx={{
                color: CustomTheme.palette.text.primary,
                fontWeight: "bold",
              }}
            >
              Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} sx={{ textAlign: "center", py: 4 }}>
                <Typography variant="body1" color={CustomTheme.palette}>
                  No expenses recorded yet. Add your first expense above!
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow
                key={expense.id}
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
                  {expense.date}
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
                    color: CustomTheme.palette.custom.textSecondary,
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
      {expenses.length > 0 && (
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
              Total Expenses: {expenses.length} items
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
                expenses.reduce((sum, expense) => sum + expense.amount, 0)
              )}
            </Typography>
          </Box>
        </Box>
      )}
    </TableContainer>
  );
};

export default ExpenseTable;
