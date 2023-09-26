import styles from "./ListaGiochi.module.css";
import GenericButton from "../UI/GenericButton";
import GameCard from "../UI/GameCard";

function ListaGiochi(props){
    
    function avviaGiocoGuessTheFace(){
        props.nascondiListaGiochi('GUESS_THE_FACE');
    }
    function avviaGiocoGuessTheFruit(){
        props.nascondiListaGiochi('GUESS_THE_FRUIT');
    }

    return(
        <>

            <ul className={styles.lista_giochi}>
                <GameCard
                children={
                    <>
                        <h1 className={styles.game_title}>INDOVINA IL VOLTO DEL PERSONAGGIO</h1>
                        <div className={styles.buttons_wrap}>
                            <GenericButton
                            onClick={avviaGiocoGuessTheFace}
                            alternative_button={true}
                            buttonText='Avvia Gioco'>
                            </GenericButton>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Assegna Gioco'>
                            </GenericButton>
                        </div>
                    </>
                }>
                </GameCard>

                <GameCard
                children={
                    <>
                        <h1 className={styles.game_title}>INDOVINA IL FRUTTO</h1>
                        <div className={styles.buttons_wrap}>
                            <GenericButton
                            onClick={avviaGiocoGuessTheFruit}
                            alternative_button={true}
                            buttonText='Avvia Gioco'>
                            </GenericButton>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Assegna Gioco'>
                            </GenericButton>
                        </div>
                    </>
                }>
                </GameCard>

                <GameCard
                children={
                    <>
                        <h1 className={styles.game_title}>DOMANDE PERSONALI</h1>
                        <div className={styles.buttons_wrap}>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Avvia Gioco'>
                            </GenericButton>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Assegna Gioco'>
                            </GenericButton>
                        </div>
                    </>
                }>
                </GameCard>

                <GameCard
                children={
                    <>
                        <h1 className={styles.game_title}>RIFLESSI</h1>
                        <div className={styles.buttons_wrap}>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Avvia Gioco'>
                            </GenericButton>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Assegna Gioco'>
                            </GenericButton>
                        </div>
                    </>
                }>
                </GameCard>

                <GameCard
                children={
                    <>
                        <h1 className={styles.game_title}>ALTRO TIPO DI GIOCO</h1>
                        <div className={styles.buttons_wrap}>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Avvia Gioco'>
                            </GenericButton>
                            <GenericButton
                            alternative_button={true}
                            buttonText='Assegna Gioco'>
                            </GenericButton>
                        </div>
                    </>
                }>
                </GameCard>
            </ul>
        </>
    );
}

export default ListaGiochi;