import { axiosInstance } from "@/client/axios";
import { useMutation } from "@tanstack/react-query";

type Request = {
  id: string;
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
const signIn = async (params: Request) => {
  const res = await axiosInstance.post<Response>("/merchant/login", params);
  return res.data;
};

const useSignIn = () => {
  return useMutation({
    mutationFn: signIn,
  });
};

export default useSignIn;
