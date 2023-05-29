import Currency from "../models/currencyModel";
import handlerFactory from "./handlerFactory";

const createCurrency = handlerFactory.createOne(Currency);

export default { createCurrency };
