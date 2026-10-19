import { useEffect, useState } from "react";
import StateCard from "./StateCard";
import { listReservations } from "@/api/admin";
import { useAuth } from "@clerk/react";

const ReservationsContainer = () => {
  const [data, setData] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = await getToken();
    try {
      const res = await listReservations(token);
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-4 gap-4 grid lg:grid-cols-3 md:grid-cols-2">
      <StateCard label="Campings" value={data?.campings || 0} />
      <StateCard label="Nights" value={data?.nights || 0} />
      <StateCard label="Totals" value={data?.totals || 0} />
    </div>
  );
};
export default ReservationsContainer;
