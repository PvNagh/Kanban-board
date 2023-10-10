import {
  Plus,
  ShieldAlert,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Minus,
  Circle,
  XCircle,
  Clock5,
  CircleDashed,
  CheckCircle2,
  Signal,
} from "lucide-react";
export const getPriorityIcon = (pn) => {
  switch (pn) {
    case 4:
      return <ShieldAlert size={21}color="red"  />;
    case 3:
      return <Signal size={19} color="rgb(75 85 99)" strokeWidth={3} />;
    case 2:
      return <SignalHigh size={20} color="rgb(75 85 99)" strokeWidth={3} />;
    case 1:
      return <SignalMedium size={20} color="rgb(75 85 99)" strokeWidth={3} />;
    case 0:
      return <Minus size={20} color="rgb(75 85 99)" strokeWidth={3} />;
    default:
      return <Plus size={18} color="rgb(75 85 99)" strokeWidth={3} />;
  }
};

export const getStatusIcon = (value) => {
  switch (value) {
    case "Backlog":
      return <CircleDashed size={16} strokeWidth={2} color="grey" />;
    case "Todo":
      return <Circle size={16} color="#949494" strokeWidth={2} />;
    case "In progress":
      return <Clock5 size={16} strokeWidth={2.5} color="orange" />;
    case "Done":
      return (
        <CheckCircle2 size={16} strokeWidth={2} color="blue" absoluteStrokeWidth={true}/>
      );
    case "Cancelled":
      return <XCircle size={16}  color="grey" strokeWidth={2.8} />;
    default:
      return <Plus size={20} color="#949494" strokeWidth={3} />;
  }
};
