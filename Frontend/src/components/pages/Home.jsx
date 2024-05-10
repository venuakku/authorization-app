import { Navigate, useLocation } from "react-router-dom";
import Welcome from "./Welcome";

function Home() {
    const location = useLocation();
    const getData = sessionStorage.getItem("user");


    return(
        
        <div>
        {getData ?      
            <Welcome /> : <Navigate to={"/login"}/>}
        </div>
    );
}

export default Home;