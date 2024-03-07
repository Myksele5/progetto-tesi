import { useContext } from "react";
import GenericButton from "../UI/GenericButton";
import TestsContext from "../../context/tests-context";

function SchedaSingoloTest(props){
    const tests_ctx = useContext(TestsContext);

    return(
        <div>
            <GenericButton
                onClick={tests_ctx.hideSchedaTest}
                buttonText={"Indietro"}
                generic_button
                red_styling
            ></GenericButton>
            <h1>Scheda Singolo Test {props.id}</h1>
        </div>
    );
}

export default SchedaSingoloTest;