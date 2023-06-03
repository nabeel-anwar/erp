import Currency from "../models/currencyModel";
import handlerFactory from "./handlerFactory";

const getCurrency = handlerFactory.getAll(Currency);

const createCurrency = handlerFactory.createOne(Currency);

export default { createCurrency, getCurrency };
