import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import CambioPsw from "./components/Accesso/CambioPsw";

const router = createBrowserRouter([
    { path: '/', element: <App></App>},
    { path: '/psw_recovery', element: <CambioPsw></CambioPsw>}
  ]);

function Routing(){
    return(
        <RouterProvider router={router}></RouterProvider>
    );
}

export default Routing;