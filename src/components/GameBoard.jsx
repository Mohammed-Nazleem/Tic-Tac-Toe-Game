
export default function GameBoard({onSelectSquare, bord}){

    
    return (
        <ol id="game-board">
            {bord.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol, cloumnIndex) => (
                            <li key={cloumnIndex}>
                                <button 
                                    onClick={() => onSelectSquare(rowIndex,cloumnIndex)} 
                                    disabled={playerSymbol !== null}
                                    >
                                        {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}

