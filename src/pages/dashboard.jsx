import { useState, useEffect, Fragment, useContext, lazy } from "react";
import { getData } from "../utils/config";
import "./index.css";
import Card from "../components/Card";
import { StateContext } from "../context/StateProvider";
import { statusArray, priorityArray } from "../utils/data";
import Spinner from "../components/Spinner";
const Header = lazy(() => import("../components/Header"));

const Dashboard = () => {
  const [ticket, setTicket] = useState([]);
  const [sortedTickets, setSortedTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { option } = useContext(StateContext);

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const apiData = await getData();
        setTicket(apiData.tickets);
        setUsers(apiData.users);
      } catch (error) {
        console.error("API call error:", error);
      } finally {
        setLoading(false);
      }
    };
    callApi();
  }, []);

  const sortByTitle = (a, b) => {
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    return 0;
  };

  const sortByPriority = (a, b) => {
    if (a.priority > b.priority) return -1;
    if (a.priority < b.priority) return 1;
    return 0;
  };

  useEffect(() => {
    const sortFunction =
      option.sortOption === "title" ? sortByTitle : sortByPriority;
    const newSortedTickets = [...ticket].sort(sortFunction);
    setSortedTickets(newSortedTickets);
  }, [ticket, option.sortOption]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="wrapper">
          {option.grouping === "status" &&
            statusArray.map((element) => {
              const sortedStatusTickets = sortedTickets.filter(
                (t) => t.status === element
              );
              return (
                <div key={element} className="card-wrapper">
                  <Header
                    grouping={option.grouping}
                    value={element}
                    number={sortedStatusTickets.length}
                    online={false}
                    pn={0}
                  />
                  {sortedStatusTickets.map((t) => {
                    const foundUser = users.find(
                      (user) => user.id === t.userId
                    );
                    return <Card key={t.id} tickets={t} user={foundUser} />;
                  })}
                </div>
              );
            })}
          {option.grouping === "user" &&
            users.map((user) => {
              const sortedUserTickets = sortedTickets.filter(
                (t) => t.userId === user.id
              );
              return (
                <div key={user.id} className="card-wrapper">
                  <Header
                    grouping={option.grouping}
                    value={user.name}
                    online={user.available}
                    number={sortedUserTickets.length}
                    pn={0}
                  />
                  {sortedUserTickets.map((t) => (
                    <Card key={t.id} tickets={t} user={{}} />
                  ))}
                </div>
              );
            })}
          {option.grouping === "priority" &&
            priorityArray.map((element) => {
              const sortedPriorityTickets = sortedTickets.filter(
                (t) => t.priority === element.pn
              );
              return (
                <div key={element.pn} className="card-wrapper">
                  <Header
                    grouping={option.grouping}
                    value={element.pv}
                    pn={element.pn}
                    number={sortedPriorityTickets.length}
                    online={false}
                  />
                  {sortedPriorityTickets.map((t) => {
                    const foundUser = users.find(
                      (user) => user.id === t.userId
                    );
                    return <Card key={t.id} tickets={t} user={foundUser} />;
                  })}
                </div>
              );
            })}
        </div>
      )}
    </Fragment>
  );
};

export default Dashboard;
