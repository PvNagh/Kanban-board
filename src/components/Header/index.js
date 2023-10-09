import "./index.css";
import { getStatusIcon, getPriorityIcon } from "../Icons";
import { Plus, MoreHorizontal } from "lucide-react";
import { getInitials } from "../../utils/data";

const Header = ({ grouping, pn, value, number, online }) => {
  return (
    <div className="header flexBox">
      <div className="flexBox">
        {grouping === "priority" && (
          <div className="icon">{getPriorityIcon(pn)}</div>
        )}
        {grouping === "user" && (
          <div className="avatar shift">
            <div
              className={
                online ? "avatar-indicator-on" : "avatar-indicator-off"
              }
            ></div>
            <span className="avatar-initial">{getInitials(value)}</span>
          </div>
        )}
        {grouping === "status" && (
          <div className="icon">{getStatusIcon(value)}</div>
        )}
        <div className="flexBox">
          <span className="title">{value}</span>
          <div className="numbersOfCard">{number}</div>
        </div>
      </div>
      <div className="flexBox">
        <button className="btn">
          <Plus size={20} />
        </button>
        <button className="btn">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
