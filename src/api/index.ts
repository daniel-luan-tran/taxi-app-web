import axios from // authConfig
"./axios";

export const homePage = async () => {
  const response = await axios.get("/");
  return response.data;
};
