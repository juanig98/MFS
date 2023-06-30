import "./UserCard.scss";
import { useAuth } from "../../hooks/useAuth";

function UserCard() {
  const { logout } = useAuth();
  
  return (
    <>
      <div className="user-card">
        <div className="user-pic">
          <img src="https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png" />
        </div>
        <b>Juan Ignacio Galarza</b>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}
export default UserCard;
