import express from "express";
import {
  createTransaction,
  deleteManyTransactions,
  deleteTransaction,
  getTransaction,
} from "../models/transaction/TransactionModel.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { type, description, amount, date } = req.body;

    const newCreatedData = await createTransaction({
      userId: req.userData._id,
      type,
      description,
      amount,
      date,
    });
    return res.status(201).json({
      status: "success",
      message: "transaction created",
      newCreatedData,
    });
  } catch (error) {
    next(error);
  }
});

router.get("", authenticate, async (req, res, next) => {
  try {
    const transactionData = await getTransaction(req.userData._id);
    return res.status(200).json({
      status: "success",
      transactionData,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("", authenticate, async (req, res, next) => {
  try {
    const transactionsids = req.body.idsToDelete;

    const transactionData = await deleteManyTransactions(
      transactionsids,
      req.userData._id
    );

    if (transactionData) {
      return res.status(200).json({
        status: "success",
        message: transactionData.deletedCount + "  transactions deleted",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Error while deleting transactions",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {

    const transactionData = await deleteTransaction(
      req.params.id,
      req.userData._id
    );

    if (transactionData) {
      return res.status(200).json({
        status: "success",
        message: "  transaction deleted",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: "Error while deleting transaction",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
