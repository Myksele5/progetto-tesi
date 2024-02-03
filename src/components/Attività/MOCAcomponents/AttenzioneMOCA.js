import { useEffect, useState } from "react";
import styles from "./AttenzioneMOCA.module.css";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";

function AttenzioneMOCA(){
    const [numeroEsercizio, setNumeroEsercizio] = useState(1);
    const [stileBottone_1, setStileBottone_1] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_2, setStileBottone_2] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_3, setStileBottone_3] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_4, setStileBottone_4] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_5, setStileBottone_5] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_6, setStileBottone_6] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_7, setStileBottone_7] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_8, setStileBottone_8] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_9, setStileBottone_9] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_10, setStileBottone_10] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_11, setStileBottone_11] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_12, setStileBottone_12] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_13, setStileBottone_13] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_14, setStileBottone_14] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_15, setStileBottone_15] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_16, setStileBottone_16] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_17, setStileBottone_17] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_18, setStileBottone_18] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_19, setStileBottone_19] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_20, setStileBottone_20] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_21, setStileBottone_21] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_22, setStileBottone_22] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_23, setStileBottone_23] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_24, setStileBottone_24] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_25, setStileBottone_25] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_26, setStileBottone_26] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_27, setStileBottone_27] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_28, setStileBottone_28] = useState(`${styles.lettera_da_ripetere}`)
    const [stileBottone_29, setStileBottone_29] = useState(`${styles.lettera_da_ripetere}`)

    const [numeroSottratto_1, setNumeroSottratto_1] = useState();
    const [numeroSottratto_2, setNumeroSottratto_2] = useState();
    const [numeroSottratto_3, setNumeroSottratto_3] = useState();
    const [numeroSottratto_4, setNumeroSottratto_4] = useState();
    const [numeroSottratto_5, setNumeroSottratto_5] = useState();
    // const stileBottone = `${styles.lettera_da_ripetere}`;

    const elencoNumeri_esercizio_1 = [
        2, 1, 8, 5, 4
    ];

    const elencoNumeri_esercizio_2 = [
        7, 4, 2
    ];

    const elencoLettere_esercizio_3 = [
        "F", "B", "A", "C", "M", "N", "A", "A", "J", "K", "L", "B", "A", "F", "A", "K", "D", "E", "A", "A", "A", "J", "A", "M", "O", "F", "A", "A", "B"
    ];

    function cambiaStileBottone(event){
        switch(event.target.id){
            case "1":
                setStileBottone_1(`${styles.lettera_cliccata}`);
                break;
            case "2":
                setStileBottone_2(`${styles.lettera_cliccata}`);
                break;
            case "3":
                setStileBottone_3(`${styles.lettera_cliccata}`);
                break;
            case "4":
                setStileBottone_4(`${styles.lettera_cliccata}`);
                break;
            case "5":
                setStileBottone_5(`${styles.lettera_cliccata}`);
                break;
            case "6":
                setStileBottone_6(`${styles.lettera_cliccata}`);
                break;
            case "7":
                setStileBottone_7(`${styles.lettera_cliccata}`);
                break;
            case "8":
                setStileBottone_8(`${styles.lettera_cliccata}`);
                break;
            case "9":
                setStileBottone_9(`${styles.lettera_cliccata}`);
                break;
            case "10":
                setStileBottone_10(`${styles.lettera_cliccata}`);
                break;
            case "11":
                setStileBottone_11(`${styles.lettera_cliccata}`);
                break;
            case "12":
                setStileBottone_12(`${styles.lettera_cliccata}`);
                break;
            case "13":
                setStileBottone_13(`${styles.lettera_cliccata}`);
                break;
            case "14":
                setStileBottone_14(`${styles.lettera_cliccata}`);
                break;
            case "15":
                setStileBottone_15(`${styles.lettera_cliccata}`);
                break;
            case "16":
                setStileBottone_16(`${styles.lettera_cliccata}`);
                break;
            case "17":
                setStileBottone_17(`${styles.lettera_cliccata}`);
                break;
            case "18":
                setStileBottone_18(`${styles.lettera_cliccata}`);
                break;
            case "19":
                setStileBottone_19(`${styles.lettera_cliccata}`);
                break;
            case "20":
                setStileBottone_20(`${styles.lettera_cliccata}`);
                break;
            case "21":
                setStileBottone_21(`${styles.lettera_cliccata}`);
                break;
            case "22":
                setStileBottone_22(`${styles.lettera_cliccata}`);
                break;
            case "23":
                setStileBottone_23(`${styles.lettera_cliccata}`);
                break;
            case "24":
                setStileBottone_24(`${styles.lettera_cliccata}`);
                break;
            case "25":
                setStileBottone_25(`${styles.lettera_cliccata}`);
                break;
            case "26":
                setStileBottone_26(`${styles.lettera_cliccata}`);
                break;
            case "27":
                setStileBottone_27(`${styles.lettera_cliccata}`);
                break;
            case "28":
                setStileBottone_28(`${styles.lettera_cliccata}`);
                break;
            case "29":
                setStileBottone_29(`${styles.lettera_cliccata}`);
                break;
        }
        
    }

    function prossimoEsercizio(){
        setNumeroEsercizio((numeroPreced) => (numeroPreced + 1));
    }

    return(
        <>
            {numeroEsercizio === 1 && 
            <>
                <h2>Leggi i seguenti numeri e poi ad occhi chiusi ripetili nello stesso ordine</h2>

                <div className={styles.flex_horizontal}>
                    {elencoNumeri_esercizio_1.map((number) => {
                        return <h5 className={styles.numero_da_ripetere}>{number}</h5>
                    })}
                </div>

                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimoEsercizio}
                >
                </GenericAlternativeButton>
            </>
            }

            {numeroEsercizio === 2 && 
            <>
                <h2>Leggi i seguenti numeri e poi ad occhi chiusi ripetili in ordine inverso</h2>

                <div className={styles.flex_horizontal}>
                    {elencoNumeri_esercizio_2.map((number) => {
                        return <h5 className={styles.numero_da_ripetere}>{number}</h5>
                    })}
                </div>

                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimoEsercizio}
                >
                </GenericAlternativeButton>
            </>
            }

            {numeroEsercizio === 3 && 
            <>
                <h2>Clicca su ciascuna lettera "A"</h2>

                <div className={styles.flex_horizontal}>
                    <button id="1" onClick={cambiaStileBottone} className={stileBottone_1}>{elencoLettere_esercizio_3[0]}</button>
                    <button id="2" onClick={cambiaStileBottone} className={stileBottone_2}>{elencoLettere_esercizio_3[1]}</button>
                    <button id="3" onClick={cambiaStileBottone} className={stileBottone_3}>{elencoLettere_esercizio_3[2]}</button>
                    <button id="4" onClick={cambiaStileBottone} className={stileBottone_4}>{elencoLettere_esercizio_3[3]}</button>
                    <button id="5" onClick={cambiaStileBottone} className={stileBottone_5}>{elencoLettere_esercizio_3[4]}</button>
                    <button id="6" onClick={cambiaStileBottone} className={stileBottone_6}>{elencoLettere_esercizio_3[5]}</button>
                    <button id="7" onClick={cambiaStileBottone} className={stileBottone_7}>{elencoLettere_esercizio_3[6]}</button>
                    <button id="8" onClick={cambiaStileBottone} className={stileBottone_8}>{elencoLettere_esercizio_3[7]}</button>
                    <button id="9" onClick={cambiaStileBottone} className={stileBottone_9}>{elencoLettere_esercizio_3[8]}</button>
                    <button id="10" onClick={cambiaStileBottone} className={stileBottone_10}>{elencoLettere_esercizio_3[9]}</button>
                    <button id="11" onClick={cambiaStileBottone} className={stileBottone_11}>{elencoLettere_esercizio_3[10]}</button>
                    <button id="12" onClick={cambiaStileBottone} className={stileBottone_12}>{elencoLettere_esercizio_3[11]}</button>
                    <button id="13" onClick={cambiaStileBottone} className={stileBottone_13}>{elencoLettere_esercizio_3[12]}</button>
                    <button id="14" onClick={cambiaStileBottone} className={stileBottone_14}>{elencoLettere_esercizio_3[13]}</button>
                    <button id="15" onClick={cambiaStileBottone} className={stileBottone_15}>{elencoLettere_esercizio_3[14]}</button>
                    <button id="16" onClick={cambiaStileBottone} className={stileBottone_16}>{elencoLettere_esercizio_3[15]}</button>
                    <button id="17" onClick={cambiaStileBottone} className={stileBottone_17}>{elencoLettere_esercizio_3[16]}</button>
                    <button id="18" onClick={cambiaStileBottone} className={stileBottone_18}>{elencoLettere_esercizio_3[17]}</button>
                    <button id="19" onClick={cambiaStileBottone} className={stileBottone_19}>{elencoLettere_esercizio_3[18]}</button>
                    <button id="20" onClick={cambiaStileBottone} className={stileBottone_20}>{elencoLettere_esercizio_3[19]}</button>
                    <button id="21" onClick={cambiaStileBottone} className={stileBottone_21}>{elencoLettere_esercizio_3[20]}</button>
                    <button id="22" onClick={cambiaStileBottone} className={stileBottone_22}>{elencoLettere_esercizio_3[21]}</button>
                    <button id="23" onClick={cambiaStileBottone} className={stileBottone_23}>{elencoLettere_esercizio_3[22]}</button>
                    <button id="24" onClick={cambiaStileBottone} className={stileBottone_24}>{elencoLettere_esercizio_3[23]}</button>
                    <button id="25" onClick={cambiaStileBottone} className={stileBottone_25}>{elencoLettere_esercizio_3[24]}</button>
                    <button id="26" onClick={cambiaStileBottone} className={stileBottone_26}>{elencoLettere_esercizio_3[25]}</button>
                    <button id="27" onClick={cambiaStileBottone} className={stileBottone_27}>{elencoLettere_esercizio_3[26]}</button>
                    <button id="28" onClick={cambiaStileBottone} className={stileBottone_28}>{elencoLettere_esercizio_3[27]}</button>
                    <button id="29" onClick={cambiaStileBottone} className={stileBottone_29}>{elencoLettere_esercizio_3[28]}</button>
                </div>

                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimoEsercizio}
                >
                </GenericAlternativeButton>
            </>
            }

            {numeroEsercizio === 4 && 
            <>
                <div className={styles.flex_vertical}>
                    <h2>PARTENDO DAL NUMERO 100, SOTTRAI 7 PER CINQUE VOLTE</h2>
                    <div className={styles.flex_horizontal}>
                        <label>100 - 7 =</label>
                        <input onChange={(event) => {setNumeroSottratto_1(event.target.value)}} value={numeroSottratto_1} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_horizontal}>
                        <label>??? - 7 =</label>
                        <input onChange={(event) => {setNumeroSottratto_2(event.target.value)}} value={numeroSottratto_2} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_horizontal}>
                        <label>??? - 7 =</label>
                        <input onChange={(event) => {setNumeroSottratto_3(event.target.value)}} value={numeroSottratto_3} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_horizontal}>
                        <label>??? - 7 =</label>
                        <input onChange={(event) => {setNumeroSottratto_4(event.target.value)}} value={numeroSottratto_4} className={styles.input_style}></input>
                    </div>
                    <div className={styles.flex_horizontal}>
                        <label>??? - 7 =</label>
                        <input onChange={(event) => {setNumeroSottratto_5(event.target.value)}} value={numeroSottratto_5} className={styles.input_style}></input>
                    </div>
                    
                </div>

                <GenericAlternativeButton
                    buttonText={"Prossima Domanda"}
                    onClick={prossimoEsercizio}
                >
                </GenericAlternativeButton>
            </>
            }
        </>
    );
}

export default AttenzioneMOCA;