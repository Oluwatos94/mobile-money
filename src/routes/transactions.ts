import { Router } from "express";
import {
  depositHandler,
  withdrawHandler,
  getTransactionHandler,
  updateNotesHandler,
  searchTransactionsHandler,
} from "../controllers/transactionController";
import { TimeoutPresets, haltOnTimedout } from "../middleware/timeout";
import { authenticateToken } from "../middleware/auth";
import { validateTransaction } from "../middleware/validateTransaction";

export const transactionRoutes = Router();

// Deposit route
transactionRoutes.post(
  "/deposit",
  authenticateToken,
  TimeoutPresets.long,
  haltOnTimedout,
  validateTransaction,
  depositHandler
);

// Withdraw route
transactionRoutes.post(
  "/withdraw",
  authenticateToken,
  TimeoutPresets.long,
  haltOnTimedout,
  validateTransaction,
  withdrawHandler
);

// Quick read operation
transactionRoutes.get(
  "/:id",
  authenticateToken,
  TimeoutPresets.quick,
  haltOnTimedout,
  getTransactionHandler,
);

// Notes and search
transactionRoutes.patch(
  "/:id/notes",
  authenticateToken,
  TimeoutPresets.quick,
  haltOnTimedout,
  updateNotesHandler,
);

transactionRoutes.get(
  "/search",
  authenticateToken,
  TimeoutPresets.quick,
  haltOnTimedout,
  searchTransactionsHandler,
);
