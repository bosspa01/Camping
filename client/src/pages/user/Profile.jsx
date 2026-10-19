import Buttons from "@/components/form/Buttons";
import FormInputs from "@/components/form/FormInputs";
import axios from "axios";
import { useForm } from "react-hook-form";
import { profileSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfile } from "@/api/profile";

// clerk
import { useAuth } from "@clerk/react";

const Profile = () => {
  // clerk
  const { getToken, userId } = useAuth();

  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(profileSchema),
  });
  const { errors, isSubmitting } = formState;

  const jingsubmit = async (data) => {
    const token = await getToken();
    await createProfile(token, data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <section>
      <h1 className="capitalize text-2xl font-semibold mb-4">create profile</h1>
      <div className="border p-8 rounded-md">
        <form onSubmit={handleSubmit(jingsubmit)}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInputs
              register={register}
              name="firstname"
              type="text"
              placeholder="Input Your Firstname"
              errors={errors}
            />
            <FormInputs
              register={register}
              name="lastname"
              type="text"
              placeholder="Input Your Lastname"
              errors={errors}
            />

            <Buttons text="create profile" isPending={isSubmitting} />
          </div>
        </form>
      </div>
    </section>
  );
};
export default Profile;
