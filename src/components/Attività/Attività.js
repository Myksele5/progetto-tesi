import { useContext, useEffect, useState } from "react";
import AddDomanda from "../Giochi/AddDomanda";
import AddGioco from "../Giochi/AddGioco";
import ExerciseReflexes from "../Giochi/ExerciseReflexes";
import GuessTheWord from "../Giochi/GuessTheWord";
import styles from "./Attività.module.css";
import CambioPsw from "../Accesso/CambioPsw";
import { getBytes, getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../config/firebase-config";
import AuthContext from "../../context/auth-context";


// var imagesList;

function Attività(){
    // const [image, setImage] = useState([]);

    // useEffect(() => {
    //     getAllImages();
    // }, [])

    
    // const auth_ctx = useContext(AuthContext);

    // async function getAllImages(){
    //     const listaImmaginiStorage = ref(storage, `${auth_ctx.utenteLoggato}/`);
    //     imagesList = await listAll(listaImmaginiStorage)
    //     .then((response) => {
    //         // console.log(getDownloadURL(response.items[0]))
    //         // console.log(response)
    //         response.items.forEach((item) => {
    //             console.log(item)
    //             var imageName = item.name
    //             getDownloadURL(item)
    //             .then((url) => {
    //                 setImage((previous) => [...previous, {
    //                     imageURL: url,
    //                     name: imageName
    //                 }]);
    //                 console.log(image.name);
    //             })
    //         })    
    //     })
    //     // image = await getDownloadURL(imagesList[0])
    //     .catch((err) => {
    //         console.error(err);
    //     });
    // }

    return(
        <>

            <h1 className={styles.page_title}>TESTING</h1>

            {/* {image.map((item) => {
                return (
                    <>
                        <p>{item.name}</p>
                        <img src={item.imageURL}></img>
                    </>
                );
            })} */}
            

            <CambioPsw></CambioPsw>

        </>
    );
}

export default Attività;