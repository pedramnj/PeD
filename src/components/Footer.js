function Footer(){
    return (
        <>
            <div className="footer-container">
                <div style={{height: "30px"}}></div>
                <div style={{
                    height: "2px", 
                    position: "relative", 
                    width: "100%", 
                    backgroundColor: "#003576"}}>
                    <hr style={{display:"none"}}/>
                </div>
                <div style={{height: "5px", height: "5px"}}>
                    <hr style={{display:"none"}}/>
                </div>
                <div style={{ position: "relative", marginLeft: "10px", marginRight: "10px"}}>
                    <div style={{
                        position: "relative", 
                        height: "40px",  
                        textAlign: "right",  
                        fontSize: "11px", 
                        color: "#003576",  
                        lineHeight: "16px"}}>
                        <span style={{fontSize: "12px"}}>© Politecnico di Torino</span> <br/><span style={{fontSize:"11px"}}>Corso Duca degli Abruzzi, 24 - 10129 Torino, ITALY </span>
                       <br/> <span style={{fontSize: "12px"}}>Pedram Nikjooy</span>
                    </div>
                    <div style={{
                        border: "0px solid grey",
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        height: "20px"}}>
                        <a style={{fontSize: "13px", color: "#003576"}} href= "https://didattica.polito.it/segreteria/contatta/it/">Contatti</a>
                    </div>
                    <div style={{ border: "0px solid grey",
                                position: "absolute", 
                                top: "0px",
                                left: "0px",
                                height: "20px"}}>
                        <a style={{fontSize: "13px", color: "#003576"}} href="https://didattica.polito.it/segreteria/contatta/it/">Contatti</a>
                    </div>
                </div>
            </div>
        </>
    );

}

export {Footer};