import { Fragment, Suspense, lazy } from "react";
import StateProvider from "./context/StateProvider";
import Spinner from "./components/Spinner";
const Navbar = lazy(() => import("./components/Navbar"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  return (
    <Fragment>
      <StateProvider>
        <Suspense fallback={<Spinner />}>
          <Navbar />
          <Dashboard />
        </Suspense>
      </StateProvider>
    </Fragment>
  );
}

export default App;
