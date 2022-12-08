import axios from "axios";

export const getProducts = async () =>
  await axios.get("https://products-warehouse.herokuapp.com/");

export const postProducts = async (obj) =>
  await axios.post("https://products-warehouse.herokuapp.com/", obj);
