import { configureStore, Tuple } from "@reduxjs/toolkit";
import reducer from "../reducers";
import { thunk } from "redux-thunk";
import logger from "../middleware/logger";

export const store = configureStore({
    reducer: reducer,
    middleware: () => new Tuple(thunk, logger),
  });