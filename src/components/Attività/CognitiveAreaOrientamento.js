import GenericAlternativeButton from "../UI/GenericAlternativeButton";
import styles from "./CognitiveAreaOrientamento.module.css";
import { useEffect, useState } from "react";

function CognitiveAreaOrientamento(props){
    // const [nomePaziente, setNomePaziente] = useState(props.nomePaz);
    // const [cognomePaziente, setCognomePaziente] = useState(props.cognomePaz);
    const [nomeInserito, setNomeInserito] = useState("");
    const [cognomeInserito, setCognomeInserito] = useState("");
    const [dataInserita, setDataInserita] = useState("");
    const [luogoInserito, setLuogoInserito] = useState("");

    // useEffect(() => {
    //     console.log(nomePaziente);
    //     console.log(cognomePaziente);
    // }, [])

    function nomeInseritoChangeHandler(event){
        setNomeInserito(event.target.value);
        console.log(event.target.value);
    }

    function cognomeInseritoChangeHandler(event){
        setCognomeInserito(event.target.value);
        console.log(event.target.value);
    }

    function dataInseritaChangeHandler(event){
        setDataInserita(event.target.value);
        console.log(event.target.value);
    }

    function luogoInseritoChangeHandler(event){
        setLuogoInserito(event.target.value);
        console.log(event.target.value);
    }

    function salvaRisposte(){
        props.risposteAreaCog1(nomeInserito, cognomeInserito, dataInserita, luogoInserito);
    }

    return(
        <>
            <h2>Come ti chiami?</h2>
            
            <section className={styles.flex_horizontal}>
                <div className={styles.flex_vertical}>
                    <label className={styles.label_style}>Nome</label>
                    <input value={nomeInserito} onChange={nomeInseritoChangeHandler} className={styles.input_style} placeholder="..."></input>
                </div>
                
                <div className={styles.flex_vertical}>
                    <label className={styles.label_style}>Cognome</label>
                    <input value={cognomeInserito} onChange={cognomeInseritoChangeHandler} className={styles.input_style} placeholder="..."></input>
                </div>
            </section>
                
            <h2>Che data è oggi?</h2>
            <section className={styles.flex_horizontal}>

                <div className={styles.flex_vertical}>
                    <input value={dataInserita} onChange={dataInseritaChangeHandler} type="date" className={styles.input_style}></input>
                </div>
                
                {/* <div className={styles.flex_vertical}>
                    <label>GIORNO</label>
                    <select className={styles.select_style}>
                        <option hidden>--</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                    </select>
                </div>
                
                <div className={styles.flex_vertical}>
                    <label>MESE</label>
                    <select className={styles.select_style}>
                        <option hidden>--</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                    </select>
                </div>
                
                <div className={styles.flex_vertical}>
                    <label>ANNO</label>
                    <select className={styles.select_style}>
                        <option hidden>----</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                    </select>
                </div> */}
            </section>
            
            
            
            <h2>In quale luogo ci troviamo?</h2>
            <input value={luogoInserito} onChange={luogoInseritoChangeHandler} className={styles.input_style} placeholder=".."></input>
            
            <GenericAlternativeButton
                buttonText={"Prox Domand"}
                onClick={salvaRisposte}
            >
            </GenericAlternativeButton>
        </>
    );
}

export default CognitiveAreaOrientamento;