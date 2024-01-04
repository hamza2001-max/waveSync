import { useUserZus } from "../store";

export const Home = () => {
  const user = useUserZus(state => state.user);

  return (
    <div>
      <h1>{user?.email}</h1>
      <h1>{user?.fullname}</h1>
      <h1>{user?.username}</h1>
      <h1>{user?.createdAt}</h1>
      <h1>{user?.profileImage}</h1>
    </div>
  )
}
