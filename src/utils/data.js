export const statusArray = [
  "Backlog",
  "Todo",
  "In progress",
  "Done",
  "Cancelled",
];
export const priorityArray = [
  { pn: 4, pv: "Urgent" },
  { pn: 3, pv: "High" },
  { pn: 2, pv: "Medium" },
  { pn: 1, pv: "Low" },
  { pn: 0, pv: "No priority" },
];
export const grpArr = ["status", "user", "priority"];
export const orderArr = ["priority", "title"];
export const getInitials = (value) => {
  const words = value.split(" ");
  const initials = words.map((word) => word.charAt(0));
  return initials.join("");
};
