import { useState } from "react";
import GenericAlternativeButton from "../../UI/GenericAlternativeButton";

function AstrazioneMOCA(props){
    const [similitudine_1, setSimilitudine_1] = useState("");
    const [similitudine_2, setSimilitudine_2] = useState("");

    function salvaRisposteAreaCognitiva7(){
        let oggettoDomandeRisposte = [
            {
                domanda: "Quali sono le similarità fra",
                similarità: [
                    {
                        similitudine: similitudine_1,
                    },
                    {
                        similitudine: similitudine_2,
                    }
                ]
            }
        ]

        props.risposteAreaCog7(oggettoDomandeRisposte)
    }

    function similitudine1ChangeHandler(event){
        setSimilitudine_1(event.target.value);
    }
    function similitudine2ChangeHandler(event){
        setSimilitudine_2(event.target.value);
    }

    return(
        <>
            <h2>Quali sono le similarità fra:</h2>
            <h2>TRENO E BICI</h2>
            <textarea onChange={similitudine1ChangeHandler}></textarea>
            <h2>OROLOGIO E RIGHELLO</h2>
            <textarea onChange={similitudine2ChangeHandler}></textarea>
            <GenericAlternativeButton
                buttonText={"Prossima Domanda"}
                onClick={salvaRisposteAreaCognitiva7}
            >
            </GenericAlternativeButton>
        </>
    );
}

export default AstrazioneMOCA;