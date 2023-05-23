import { useLocation } from "react-router-dom";

const Home = (props) => {
    const location = useLocation();
    console.log(location.state);

    return <h1>Home</h1>
}

export default Home