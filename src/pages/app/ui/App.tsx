import Header from "../../../standards/components/Header";
import LoggedOutRoutes from "../components/LoggedOutRoutes";


function App() {
  return (
    <div style={{fontFamily:"Inter"}} className=" h-full w-full bg-tan">
        <Header/>
        <LoggedOutRoutes/>
    </div>
  );
}

export default App;
