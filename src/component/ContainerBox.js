import React, { useState, useEffect } from "react";
import "../css/ContainerBox.css";
import XoBox from "./XoBox";

export default function ContainerBox() {
    const a = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const [xoState, setXoState] = useState(a);
    const [xo, setXO] = useState("x");
    const [win, setWin] = useState("");
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (count === 9 && win.length === 0) {
            setWin('Draw')
        }
    }, [count, win])

    const provideValue = async (id, xoValue) => {
        xo === "x" ? setXO("o") : setXO("x");

        let newState = xoState;
        newState.forEach((v, i) => {
            v.forEach((v, j) => {
                if (v === id) {
                    newState[i][j] = xoValue;
                }
            });
        });

        setXoState(newState);
        const p = new Promise((resolve, reject) => {

            setCount(count => count + 1)
            if (count) {
                resolve()
            }
        })

        await p.then(cheakWinner)



    };

    const cheakWinner = () => {

        xoState.forEach((v, i) => {
            if (v[0] === "x" && v[1] === "x" && v[2] === "x") {
                setWin(" X");
            } else if (v[0] === "o" && v[1] === "o" && v[2] === "o") {
                setWin(" O");
            }
        });


    };

    const restart = () => {
        window.location.reload()
    }



    return (
        <>
            <h1 id="h">OX Game</h1>




            <div className="con">
                {Array.from(Array(9).keys()).map((v) => {
                    return (
                        <XoBox
                            key={v}
                            id={v}
                            xo={xo}
                            provideValue={provideValue}
                            win={win}
                        />
                    );
                })}
            </div>


            <h1 style={{ textAlign: "center", color: 'white' }}>{win.length !== 0 ? `Winner :- ${win} ` : <span > {xo} turn</span>}</h1>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    win && <button id="btn" onClick={restart}>Restart</button>
                }
            </div>
        </>
    );
}
