import GenericButton from "../UI/GenericButton";

function TestMMSE(){
    return(
        <div>
            <label>Ciao sono il test<br/></label>
            <label>INFO PRIMA DI INIZIARE IL TEST</label>
            <GenericButton
                generic_button={true}
                buttonText={"INIZIA TEST"}
            >
            </GenericButton>
        </div>
    );
}

export default TestMMSE;