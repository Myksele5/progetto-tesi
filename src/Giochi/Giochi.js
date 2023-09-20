import styles from "./Giochi.module.css";
import SearchBox from "../UI/SearchBox";
import GenericButton from "../UI/GenericButton";
import GameCard from "../UI/GameCard";

function Giochi(){
    function formNewGame(){
        console.log('MOSTRA FORM PER AGGIUNGERE NUOVO GIOCO');
    }

    return(
        <div className={styles.schermata_giochi}>
            <h1 className={styles.page_title}>Giochi</h1>

            <div className={styles.wrap_boxes}>
                <SearchBox></SearchBox>

                <GenericButton
                onClick={formNewGame}
                buttonText={"Aggiungi Gioco"}>
                </GenericButton>
            </div>

            <div className={styles.wrapper_general}>
                <ul className={styles.lista_giochi}>
                    <GameCard
                    children={
                        <>
                            <h1 className={styles.game_title}>INDOVINA IL VOLTO DEL PERSONAGGIO</h1>
                            <div className={styles.buttons_wrap}>
                                <button className={styles.button_style}>Avvia Gioco</button>
                                <button className={styles.button_style}>Assegna Gioco</button>
                            </div>
                        </>
                    }>
                    </GameCard>

                    <GameCard
                    children={
                        <>
                            <h1 className={styles.game_title}>INDOVINA IL FRUTTO</h1>
                            <div className={styles.buttons_wrap}>
                                <button className={styles.button_style}>Avvia Gioco</button>
                                <button className={styles.button_style}>Assegna Gioco</button>
                            </div>
                        </>
                    }>
                    </GameCard>

                    <GameCard
                    children={
                        <>
                            <h1 className={styles.game_title}>DOMANDE PERSONALI</h1>
                            <div className={styles.buttons_wrap}>
                                <button className={styles.button_style}>Avvia Gioco</button>
                                <button className={styles.button_style}>Assegna Gioco</button>
                            </div>
                        </>
                    }>
                    </GameCard>

                    <GameCard
                    children={
                        <>
                            <h1 className={styles.game_title}>RIFLESSI</h1>
                            <div className={styles.buttons_wrap}>
                                <button className={styles.button_style}>Avvia Gioco</button>
                                <button className={styles.button_style}>Assegna Gioco</button>
                            </div>
                        </>
                    }>
                    </GameCard>

                    <GameCard
                    children={
                        <>
                            <h1 className={styles.game_title}>ALTRO TIPO DI GIOCO</h1>
                            <div className={styles.buttons_wrap}>
                                <button className={styles.button_style}>Avvia Gioco</button>
                                <button className={styles.button_style}>Assegna Gioco</button>
                            </div>
                        </>
                    }>
                    </GameCard>
                </ul>
            </div>
        </div>
    );
}

export default Giochi;