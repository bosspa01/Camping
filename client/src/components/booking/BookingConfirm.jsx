import useBookingStore from "@/store/booking-store";
import Buttons from "../form/Buttons";
import { SignInButton, useAuth } from "@clerk/react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createBooking } from "@/api/booking";
import { useNavigate } from "react-router";

const BookingConfirm = () => {
  const range = useBookingStore((state) => state.range);
  const checkIn = range?.from;
  const checkOut = range?.to;
  const campingId = useBookingStore((state) => state.campingId);

  const { getToken, userId } = useAuth();

  const { handleSubmit, setValue, formState } = useForm();
  const { isSubmitting } = formState;

  const navigate = useNavigate();


  if (!userId) {
    return (
      <div className="flex justify-center">
        <SignInButton
          mode="modal"
          forceRedirectUrl={`/user/camping/${campingId}`}
        >
          <Button>Please Sign In</Button>
        </SignInButton>
      </div>
    );
  }


  useEffect(() => {
    console.log("Thana")
    if(campingId) setValue("campingId", campingId);
    if(checkIn) setValue("checkIn", checkIn);
    if(checkOut) setValue("checkOut", checkOut);
  }, [range]);
  const hdlBooking = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const token = await getToken();
    try {
      const res = await createBooking(token, value);
      console.log(res.data.result);
      const bookingId = res.data.id;
      navigate(`/user/checkout/${bookingId}`);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit(hdlBooking)}>
        <Buttons text="Confirm Button" isPending={isSubmitting}/>
      </form>
      
    </div>
  );
};
export default BookingConfirm;
