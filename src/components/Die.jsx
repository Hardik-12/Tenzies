/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";



export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

    return (
        <div className="die-number" style={styles} onClick={props.fun}><span className="number" >{props.value}</span></div>
    )
}