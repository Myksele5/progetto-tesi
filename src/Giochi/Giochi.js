import styles from "./Giochi.module.css";
import GenericButton from "../UI/GenericButton";
import SearchBox from "../UI/SearchBox";
import { useState } from "react";
import ListaGiochi from "./ListaGiochi";
import GameObject from "./GameObject";


function Giochi(){
    const [showSearchBoxAndButton, setShowSearchBoxAndButton] = useState(true);
    const [showListaGiochi, setShowListaGiochi] = useState(true);
    const [gameStarted, setGameStarted] = useState(null);

    let lista_giochi;
    let show_boxes;

    function startGame(){
        setShowSearchBoxAndButton(false);
        setShowListaGiochi(false);
        setGameStarted(<GameObject></GameObject>);
    }

    if(showSearchBoxAndButton){
        show_boxes = 
        <div className={styles.wrap_boxes}>
            <SearchBox></SearchBox>

            <GenericButton
            generic_button={true}
            buttonText={"Aggiungi Gioco"}>
            </GenericButton>
        </div>
    }
    else{
        show_boxes = null;
    }

    if(showListaGiochi){
        lista_giochi = 
        <ListaGiochi
        nascondiListaGiochi={startGame}>
        </ListaGiochi>
    }
    else{
        lista_giochi = null;
    }

    return(
        <div className={styles.schermata_giochi}>
            <h1 className={styles.page_title}>Giochi</h1>
            {show_boxes}

            <div className={styles.wrapper_generico}>
                {gameStarted}
                {lista_giochi}
            </div>
        </div>
    );
}

export default Giochi;