import { useNavigate } from "react-router-dom";
import { useUserZus } from "../../store";

export const ProtectedRoute = () => {
  const userZus = useUserZus((state) => state.user);
  const navigate = useNavigate();

  if (!userZus) {
    navigate("/landing");
  }
  return <span />;
};
