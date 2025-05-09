import { axiosInstance } from "@/client/axios";
import { useMutation } from "@tanstack/react-query";

type Request = {
  id: string;
  businessName: string;
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
  user: {
    id: string;
    businessName: string;
    email: string;
    wallet: string;
  };
};
const signUp = async ({ id, businessName, email, password }: Request) => {
  const res = await axiosInstance.post<Response>("/merchant/signUp", {
    id,
    businessName,
    email,
    password,
  });
  return res.data;
};

const useSignUp = () => {
  return useMutation({
    mutationFn: signUp,
  });
};

export default useSignUp;
