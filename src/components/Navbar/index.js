import React, { useState, useRef, useEffect, useContext } from "react";
import "./index.css";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { StateContext } from "../../context/StateProvider";

const Navbar = () => {
  const { setOption } = useContext(StateContext);
  const [grouping, setGrouping] = useState(
    JSON.parse(localStorage.getItem("option"))?.grouping || "status"
  );
  const [sortOption, setSort] = useState(
    JSON.parse(localStorage.getItem("option"))?.sortOption || "priority"
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dialogRef = useRef(null);

  const openDialog = () => {
    setIsMenuOpen(true);
  };

  const closeDialog = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleGroupingChange = (e) => {
    const selectedGrouping = e.target.value;
    setGrouping(selectedGrouping);
    setOption((prevOption) => ({
      ...prevOption,
      grouping: selectedGrouping,
    }));
  };

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSort(selectedSortOption);
    setOption((prevOption) => ({
      ...prevOption,
      sortOption: selectedSortOption,
    }));
  };

  return (
    <nav className="navbar">
      <button className="btn-display" onClick={openDialog}>
        <div className="flex-box">
          <SlidersHorizontal size={16} strokeWidth={2.4} />
          <span className="text">Display</span>
          <ChevronDown size={21} />
        </div>
      </button>
      <div ref={dialogRef}>
        <dialog open={isMenuOpen} className="dialog">
          <div className="flex-col">
            <label className="flex-between">
              <span className="dialog-text">Grouping</span>
              <select
                className="drop-down"
                value={grouping}
                onChange={handleGroupingChange}
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </label>
            <label className="flex-between">
              <span className="dialog-text">Ordering</span>
              <select
                className="drop-down"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </dialog>
      </div>
    </nav>
  );
};

export default Navbar;
