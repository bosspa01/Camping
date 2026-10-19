import useCampingStore from "@/store/camping-store";
import { CradSignInButtons, CradSubmitButtons } from "./CradButtons";
import { useForm } from "react-hook-form";
import { useAuth, useUser } from "@clerk/react";
import { createAlert, createNotify } from "@/utils/createAlert";
const FavoriteToggleButton = ({ campingId, isFavorite }) => {
  // clerk
  const { getToken, isSignedIn } = useAuth();
  //   const { user } = useUser();
  // Hook-Form
  const { handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;

  // Zustand
  const actionAddorRemoveFavorite = useCampingStore(
    (state) => state.actionAddorRemoveFavorite,
  );
  //   const actionListCamping = useCampingStore((state) => state.actionListCamping);

  const hdlSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const token = await getToken();
    // console.log(token)

    const res = await actionAddorRemoveFavorite(token, {
      campingId,
      isFavorite,
    });
    if (res.success) {
      createNotify("success", res.message);
    } else {
      createNotify("error", res.message);
    }
    // actionListCamping(user.id);
  };

  //   console.log(campingId, isFavorite);

  if (!isSignedIn) {
    return (
      <CradSignInButtons />
    )
  }

  return (
    <form onSubmit={handleSubmit(hdlSubmit)}>
      <CradSubmitButtons isPending={isSubmitting} isFavorite={isFavorite} />
    </form>
  );
};
export default FavoriteToggleButton;
