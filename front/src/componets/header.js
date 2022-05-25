import React from "react";
import { useNavigate } from "react-router";


const Header = () => {
    const navigate = useNavigate();


    const signOut = () => {
        localStorage.removeItem('token')
        navigate(0)
    }
    return (
        <>
            <header>
                {
                    !localStorage.getItem('token')
                        ? <>

                            <div style={{
                                display: 'flex',
                                alignItems: "center",
                                flexDirection: 'column'
                            }}>
                                <spam style={{
                                    fontSize: '40px'
                                }}>
                                    Funeraria de hutao
                                </spam>
                                <spam>
                                    <img alt="hu tao" style={{
                                        height: '200px'
                                    }} src="/hutaoPixel.gif"></img>
                                </spam>

                            </div>
                        </>
                        : <>
                            <div style={{
                                display: "flex",
                                padding: "12px",
                                justifyContent: "space-between",
                                backgroundColor: "#000"
                            }}>
                                <h4>
                                    vista admin
                                </h4>
                                <button style={{ color: "#000", backgroundColor: "#666" }} type="button" onClick={signOut}>sign out</button>
                            </div>
                        </>

                }
            </header>
        </>
    )
}
export default Header