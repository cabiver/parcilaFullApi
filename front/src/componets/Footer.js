import React from "react";
const Footer =() => {
    return (
        <>
            <footer style={{
                marginTop:"40px",
                background: "#28082A",
                height: "fit-content",
                display:"flex",
                padding:"12px 30px 10px 30px",
                justifyContent:"space-between"
            }}>
                <div >
                    <div>
                        telefono: 3045715763
                    </div>
                    <div>
                        ciudad: barranquilla/atlantico
                    </div>
                    <div>
                        color: 3045715763
                    </div>
                </div>
                <div style={{
                    
                }}>
                    <img style={{
                        height:"120px"
                    }} alt="jonathan joestar" src="/jonathan.png"></img>
                </div>
            </footer>
        </>
    )
}

export default Footer