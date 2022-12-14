import axios from "axios";

export const getProducts = async () =>
  await axios.get("https://www.scandiwebproductswarehouse.online/index.php");

export const postProducts = async (data) =>
  await axios.post(
    "https://www.scandiwebproductswarehouse.online/index.php",
    data
  );

export const deleteProducts = async (idArray) =>
  await axios.delete(
    "https://www.scandiwebproductswarehouse.online/index.php",
    {
      data: idArray,
    }
  );
