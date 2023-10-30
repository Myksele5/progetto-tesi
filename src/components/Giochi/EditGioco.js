import Card from "../UI/Card";
import ElencoDomande from "./ElencoDomande";

function EditGioco(){
    return(
        <Card
        children={
            <form>
                <h1>Modifica il gioco</h1>

                <label>Tipologia Gioco:</label>
                <input type="text"></input>

                <label>Difficoltà:</label>
                <input type="text"></input>

                <label>Nome Gioco:</label>
                <input type="text"></input>

                <ElencoDomande></ElencoDomande>
            </form>
        }
        >
        </Card>
    );
}

export default EditGioco;