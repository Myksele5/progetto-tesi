import styles from "./Giochi.module.css";
import GenericButton from "../UI/GenericButton";
import SearchBox from "../UI/SearchBox";
import { useContext } from "react";
import ListaGiochi from "./ListaGiochi";
import AddGioco from "./AddGioco";
import GameContext from "../../context/game-context";
import AddDomanda from "./AddDomanda";

function Giochi(){
    const game_ctx = useContext(GameContext);
    
    return(
        <>
            <h1 className={styles.page_title}>Giochi</h1>
            {game_ctx.showBarraRicercaBottone && 
                <div className={styles.wrap_boxes}>
                    <GenericButton
                        onClick={game_ctx.formCreaNuovaDomanda}
                        generic_button={true}
                        buttonText={"Crea nuove domande"}
                    >
                    </GenericButton>
        
                    <GenericButton
                        onClick={game_ctx.formCreaNuovoGioco}
                        generic_button={true}
                        buttonText={"Aggiungi Gioco"}
                    >
                    </GenericButton>
                </div>
            }

            <div className={styles.wrapper_generico}>
                {game_ctx.showAggiungiNuovoGioco && 
                    <>
                        <AddGioco
                            chiudiFormNewGame={game_ctx.chiudiFormCreaNuovoGioco}
                        >
                        </AddGioco>
                        {/* <AddDomanda></AddDomanda> */}
                    </>
                }

                {game_ctx.showAggiungiNuovaDomanda &&
                    <>
                        <AddDomanda
                            hideForm={game_ctx.chiudiFormCreaNuovaDomanda}
                            aggiornaDomande={game_ctx.aggiungiDomandaAllaLista}
                        >
                        </AddDomanda>
                    </>
                }

                {game_ctx.showModificaGioco && game_ctx.giocoDaModificare}

                {game_ctx.showListaGiochi && 
                    <ListaGiochi
                        nascondiListaGiochi={game_ctx.iniziaGioco}
                    >
                    </ListaGiochi>
                }

                {game_ctx.risultatiGioco && game_ctx.risposteUtente}

                {game_ctx.oggettoGioco}
                
            </div>
        </>
);
}

export default Giochi;