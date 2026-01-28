import user from "../../../../public/icons/stat_user.svg";
import users from "../../../../public/icons/stat_users.svg";
import loan from "../../../../public/icons/stat_loan.svg";
import coin from "../../../../public/icons/stat_coins.svg";

export default function UserStats() {
  return (
    <div className="users__stats">
      <div className="users__statCard">
        <div className="users__statIcon users__statIcon--users">
          <img src={user} alt="" />
        </div>
        <div className="users__statContent">
          <h3>USERS</h3>
          <p>2,453</p>
        </div>
      </div>

      <div className="users__statCard">
        <div className="users__statIcon users__statIcon--active">
          <img src={users} alt="" />
        </div>
        <div className="users__statContent">
          <h3>ACTIVE USERS</h3>
          <p>2,453</p>
        </div>
      </div>

      <div className="users__statCard">
        <div className="users__statIcon users__statIcon--loans">
          <img src={loan} alt="" />
        </div>
        <div className="users__statContent">
          <h3>USERS WITH LOANS</h3>
          <p>12,453</p>
        </div>
      </div>

      <div className="users__statCard">
        <div className="users__statIcon users__statIcon--savings">
          <img src={coin} alt="" />
        </div>
        <div className="users__statContent">
          <h3>USERS WITH SAVINGS</h3>
          <p>102,453</p>
        </div>
      </div>
    </div>
  );
}
