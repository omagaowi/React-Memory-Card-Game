const EndScreen = ({visible, results, winner}) => {
    // console.log(results[0])
    return (
        <div className={`endScreen show${visible} win${winner}`}>
            <div className="end-score">
                <h1>{results[0].score}-{results[1].score}</h1>
            </div>
            {
                results[0].score > results[1].score ? (
                    <h3>Blue Wins</h3>
                ):(
                    <h3>Red Wins</h3>
                )
            }
        </div>
    )
}

export default EndScreen