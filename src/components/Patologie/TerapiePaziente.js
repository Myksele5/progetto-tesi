import { useContext, useEffect, useState } from "react";
import styles from "./TerapiePaziente.module.css";
import AuthContext from "../../context/auth-context";
import { getServerMgr } from "../../backend_conn/ServerMgr";
import { Card } from "react-bootstrap";

function TerapiePaziente(){
    const auth_ctx = useContext(AuthContext);
    const [terapiePersonali, setTerapiePersonali] = useState([]);
    
    useEffect(()=> {
        recuperaTerapie();
    }, [])

    async function recuperaTerapie(){
        let resultTerapie = await getServerMgr().infoPatologie(auth_ctx.pazienteLoggatoID)
        console.log(resultTerapie);
        setTerapiePersonali(resultTerapie);
    }

    return(
        <div className={styles.wrapper_terapia}>
            {terapiePersonali?.map((terapia) => (
                <Card border="primary" style={{margin: "10px"}}>
                    <Card.Header className={styles.title_terapia} border="primary">Terapia per {terapia.nomePatologia}</Card.Header>
                    <Card.Body>
                        <p className={styles.label_style}>Terapia: </p>
                        <p className={styles.content_style}>{terapia.terapia}</p>
                        <p className={styles.label_style}>Note: </p>
                        <p className={styles.content_style}>{terapia.note}</p>
                        
                    </Card.Body>
                    <Card.Footer>
                        <div className={styles.wrapper_date}>
                            <div className={styles.horizontal}>
                                <p style={{marginRight: "8px"}} className={styles.label_style}>Inizio terapia: </p>
                                <p className={styles.content_style}>{terapia.dataInizio.length > 0 ? terapia.dataInizio : "Non definita"}</p>
                            </div>
                            <div className={styles.horizontal}>
                                <p style={{marginRight: "8px"}} className={styles.label_style}>Fine terapia: </p>
                                <p className={styles.content_style}>{terapia.dataFine.length > 0 ? terapia.dataFine : "Non definita"}</p>
                            </div>
                        </div>
                        
                    </Card.Footer>
                </Card>
            ))}
        </div>
    );
}

export default TerapiePaziente;