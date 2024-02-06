import { useEffect } from "react";
import { useUserZus } from "../store";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const setUserZus = useUserZus(state => state.setUser);
  const userZus = useUserZus(state => state.user);
  const location = useLocation();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("auth") === "google") {
      setUserZus({
        email: queryParams.get("email")!,
        fullname: queryParams.get("fullname")!,
        profileImage: queryParams.get("profileImage"),
        username: queryParams.get("username")!,
        createdAt: queryParams.get("createdAt")!,
      });
    } 
  }, []);

  return (
    <div>
      <h1>{userZus?.email}</h1>
      <h1>{userZus?.fullname}</h1>
      <h1>{userZus?.username}</h1>
      <h1>{userZus?.createdAt}</h1>
      <h1>{userZus?.profileImage}</h1>
    </div>
  )
}
