import React from "react";
import "./index.css";
import { useContext } from "react";
import { StateContext } from "../../context/StateProvider";
import { getPriorityIcon, getStatusIcon } from "../Icons";
import { getInitials } from "../../utils/data";
import { Dot } from "lucide-react";

function Card({ tickets, user }) {
  const { id, title, tag, userId, status, priority } = tickets;
  const { option } = useContext(StateContext);
  const groupValue = option.grouping;

  return (
    <div className="card">
      <div className="card-header flex-between">
        <span className="id">{id}</span>
        {groupValue !== "user" && (
          <div className="avatar">
            <div
              className={
                user.available
                  ? "avatar-indicator avatar-on"
                  : "avatar-indicator avatar-off"
              }
            ></div>
            <span className="avatar-initial">{getInitials(user.name)}</span>
          </div>
        )}
      </div>
      <div className="card-body">
        {groupValue !== "status" && (
          <button className="status-icon">{getStatusIcon(status)}</button>
        )}
        <p className="card-title">{title}</p>
      </div>
      <div className="card-footer">
        {groupValue !== "priority" && (
          <div className="icon-box">
            <span className="incs">{getPriorityIcon(priority)}</span>
          </div>
        )}
        <div className="footer-box">
          <Dot strokeWidth={9} />
          {tag.map((tagItem, index) => (
            <span key={index}>{tagItem}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
