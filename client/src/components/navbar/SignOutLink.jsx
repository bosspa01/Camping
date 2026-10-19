import { SignOutButton } from "@clerk/react";
import { toast } from "@/components/ui/toast";

const SignOutLink = () => {
  const handleLogout = () => {
    
    toast.add({ 
      title: "สำเร็จ", 
      description: "Logout Successfully",
      type: "success"
    });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button onClick={handleLogout}>Logout</button>
    </SignOutButton>
  );
};
export default SignOutLink;
