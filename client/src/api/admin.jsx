import axios from "axios";

export const listStats = async (token) => {
  return await axios.get("http://localhost:5000/api/stats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listReservations = async (token) => {
  return await axios.get("http://localhost:5000/api/reservations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listAllReservations = async (token) => {
  return await axios.get("http://localhost:5000/api/all-reservations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listMyCampings = async (token) => {
  return await axios.get("http://localhost:5000/api/my-campings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};