import styles from "./ListaGiochi.module.css";
import { useContext } from "react";
import GameContext from "../../context/game-context";

function ListaGiochi(){
    const game_ctx = useContext(GameContext);

    return(
        <>

            <ul className={styles.lista_giochi}>
                {game_ctx.listaGiochi}
                {/* {listaGiochiMostrati} */}
            </ul>
        </>
    );
}

export default ListaGiochi;