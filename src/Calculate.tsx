import React from "react";

type TypeSign = "+" | "-" | "*" | "/" | "AC" | "+/-" | "%" 

function Calculate(): JSX.Element {
    const [display, setDisplay] = React.useState("")
    const [secondDisplay, setSecondDisplay] = React.useState("")
    const numberOneRef = React.useRef("")
    const signFunctionRef = React.useRef<TypeSign>()

    const handleNumberButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const buttonValue = e.currentTarget.name
        setDisplay(prew => prew + buttonValue)
        setSecondDisplay(prew => prew + buttonValue)
    }

    const handleFunctionButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const functSign = e.currentTarget.name
        if (functSign === "AC") {
            setDisplay("")
            setSecondDisplay("")
            numberOneRef.current = ""
        } else if (functSign === "+/-" && display === "") {
            setDisplay("-")
        } else if (functSign === "%" && display !== undefined) {    /* vypocet percent */
            setSecondDisplay(prew => prew + functSign)
            setDisplay("")
            const oneNumberToNumb = parseFloat(display)
            const onePercento = oneNumberToNumb / 100
            const oneNumberToString = onePercento.toString()
            numberOneRef.current = oneNumberToString
            signFunctionRef.current = "*"
            return
        } else if (display) {
            setSecondDisplay(prew => prew + functSign)
            signFunctionRef.current = functSign as TypeSign
            numberOneRef.current = display
            setDisplay("")
        }
    }

    const handleResultButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
        const resSign = e.currentTarget.name
        if (numberOneRef.current && signFunctionRef.current && display) {
            const result: string = eval(`${numberOneRef.current} ${signFunctionRef.current} ${display}`)
            setDisplay(result)
            setSecondDisplay(prew => prew + resSign + result)
        }
    }

    return (
        <div className="calculate">
            <div className="secondDisplay">
                <input
                    disabled
                    defaultValue={secondDisplay}
                    type="text" />
            </div>
            <div className="masterDisplay">
                <input
                    disabled
                    defaultValue={display}
                    type="text" />
            </div>
            <div className="button">
                <div className="buttonBox">
                    <button id="functBtn" name="AC" onClick={handleFunctionButton}>AC</button>
                    <button id="functBtn" name="+/-" onClick={handleFunctionButton}>+/-</button>
                    <button id="functBtn" name="%" onClick={handleFunctionButton}>%</button>
                    <button id="functBtn" name="/" onClick={handleFunctionButton}>/</button>
                </div>
                <div>
                    <button name="7" onClick={handleNumberButton}>7</button>
                    <button name="8" onClick={handleNumberButton}>8</button>
                    <button name="9" onClick={handleNumberButton}>9</button>
                    <button id="functBtn" name="*" onClick={handleFunctionButton}>X</button>
                </div>
                <div>
                    <button name="4" onClick={handleNumberButton}>4</button>
                    <button name="5" onClick={handleNumberButton}>5</button>
                    <button name="6" onClick={handleNumberButton}>6</button>
                    <button id="functBtn" name="-" onClick={handleFunctionButton}>-</button>
                </div>
                <div>
                    <button name="1" onClick={handleNumberButton}>1</button>
                    <button name="2" onClick={handleNumberButton}>2</button>
                    <button name="3" onClick={handleNumberButton}>3</button>
                    <button id="functBtn" name="+" onClick={handleFunctionButton}>+</button>
                </div>
                <div>
                    <button name="0" onClick={handleNumberButton}>0</button>
                    <button name="." onClick={handleNumberButton}>.</button>
                    <button id="functBtn" name="=" onClick={handleResultButton}>=</button>
                </div>
            </div>
        </div>
    )
}

export default Calculate