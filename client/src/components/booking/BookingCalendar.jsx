import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import useBookingStore from "@/store/booking-store";

const defaultSelected = {
  from: undefined,
  to: undefined,
};

const BookingCalendar = () => {
  const [range, setRange] = useState(defaultSelected);

//   console.log(range);
useEffect(() => {
    useBookingStore.setState({ 
        range, 
    });
},[range])

  return (
    <div>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        className="rounded-lg border"
      />
    </div>
  );
};
export default BookingCalendar;
