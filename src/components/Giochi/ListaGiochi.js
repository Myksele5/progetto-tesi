import styles from "./ListaGiochi.module.css";
import { useContext, useEffect } from "react";
import GameContext from "../../context/game-context";
import GameCard from "../UI/GameCard";
import GenericButton from "../UI/GenericButton";

function ListaGiochi(props){
    const game_ctx = useContext(GameContext);
    var lista = game_ctx.listaGiochi;

    useEffect(() => {
        lista = game_ctx.listaGiochi;
    }, [lista]);

    function fromArrayToGameList(lista){
        return(
            <ul className={styles.lista_giochi}>
                <GameCard
                    children={
                        <>
                            <div>
                                <h1 className={styles.game_title}>{lista.nomeGioco}</h1>
                                <h3 className={styles.game_subtitle}>Tipologia gioco: <span className={styles.game_type}>{lista.tipoGioco}</span></h3>
                                <h3 className={styles.game_subtitle}>Livello difficoltà: <span className={styles.game_type}>{lista.livelloGioco}</span></h3>
                                <h3 className={styles.game_subtitle}>CODICE DEL GIOCO: <span className={styles.game_type}>{lista.codiceGioco}</span></h3>
                            </div>
                            
                            <div className={styles.buttons_wrap}>
                                <GenericButton
                                onClick={()=> {
                                    props.iniziaGioco(lista.tipoGioco, lista.codiceGioco)
                                }}
                                alternative_button={true}
                                buttonText='Avvia Gioco'>
                                </GenericButton>

                                <GenericButton
                                onClick={() => {
                                    game_ctx.modificaGioco(lista)
                                    props.mostraFormModificaGioco(lista);
                                }}
                                alternative_button={true}
                                buttonText='Gestione Gioco'>
                                </GenericButton>

                                <GenericButton
                                onClick={() => {
                                    game_ctx.eliminaGioco(lista.codiceGioco)
                                }}
                                small_button={true}
                                buttonText='Elimina Gioco'>
                                </GenericButton>
                            </div>
                        </>
                    }>
                </GameCard>
            </ul>
        );
        
    }

    return(
        
        <>
            {game_ctx.showModale && game_ctx.modale}
            {lista.map(fromArrayToGameList)}
        </>
    
    );
}

export default ListaGiochi;