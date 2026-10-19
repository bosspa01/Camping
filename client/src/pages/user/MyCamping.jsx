import { listMyCampings } from "@/api/admin";
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
import BookingPDF from "@/components/booking/BookingPDF";

const MyCamping = () => {
  const [campings, setCampings] = useState([]);
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchBooking();
    }
  }, [isLoaded, isSignedIn]);

  const fetchBooking = async () => {
    const token = await getToken();
    try {
      const res = await listMyCampings(token);
      //   console.log(res.data.result);
      setCampings(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <h1>
            Totals Campings : {campings.length}
        </h1>
      <Table>
        <TableCaption>A list of your past bookings.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>รหัสการจอง</TableHead>
            <TableHead>ชื่อ</TableHead>
            <TableHead>ราคา/คืน</TableHead>
            {/* <TableHead>ราคารวม</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Invoice</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {campings?.map((item) => {
            const { id, title, price } = item;
            // const { title } = item.landmark;
            return (
              <TableRow key={item.id}>
                <TableCell>{id}</TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{price}</TableCell>
                {/* <TableCell>{formatNumber(total)}</TableCell>
                <TableCell>{formatDate(checkIn)}</TableCell>
                <TableCell>{formatDate(checkOut)}</TableCell>
                <TableCell>
                  <BookingPDF booking={item} />
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default MyCamping;
