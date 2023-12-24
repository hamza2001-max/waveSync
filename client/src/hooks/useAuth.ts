import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";

export const useAuth = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios
          .post("http://localhost:7000/user/login", loginFields, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })
          .catch((error: AxiosError) => {
            const errorMessage = error.response?.data as { message: string };
            errorMessage && setServerError(errorMessage.message);
          });

        // const userIdCookie = document.cookie
        //   .split("; ")
        //   .find((cookie) => cookie.startsWith("userId="))
        //   ?.split("=")[1];
        // console.log(userIdCookie);

        console.log(response);
        response && setServerError("");
      } catch (error) {
        console.log(error, " in the try/catch block of login useMutation.");
      }
    },
    onError: () => {
      console.log("error in the login useMutation.");
    },
  });
};
