import { useSelector } from "react-redux";
import { RootState } from "../../store";

function User() {
  const nickName = useSelector((state:RootState) => state.user.userData.nickName);
  return (
    <div>
      <h3>{nickName}</h3>
    </div>
  );
}
export default User;
