import { listAllReservations } from "@/api/admin";
import { useAuth } from "@clerk/react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatNumber } from "@/utils/formats";

import ReservationsContainer from "@/components/admin/ReservationsContainer";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchReservation();
    }
  }, [isLoaded, isSignedIn]);

  const fetchReservation = async () => {
    const token = await getToken();
    try {
      const res = await listAllReservations(token);
      console.log(res.data);
      setReservations(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <ReservationsContainer />
      {/* Table */}
      <div className="mt-8">
        <h1>Total Reservations : {reservations.length}</h1>

        <Table>
          <TableCaption>A list of your past bookings.</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>รหัสการจอง</TableHead>
              <TableHead>ชื่อ</TableHead>
              <TableHead>จำนวนคืน</TableHead>
              <TableHead>ราคารวม</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reservations?.map((item) => {
              const { id, total, totalNights, checkIn, checkOut } = item;
              const { title } = item.landmark;
              return (
                <TableRow key={item.id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatNumber(total)}</TableCell>
                  <TableCell>{formatDate(checkIn)}</TableCell>
                  <TableCell>{formatDate(checkOut)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default MyReservations;
