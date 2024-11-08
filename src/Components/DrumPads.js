function Drumpads({ id, link, letter, onClick }) {
    return (
        <div
            key={id}
            id={id}
            data-letter={letter}
            onClick={onClick}
            className="pads"
        >
            <audio
                key={letter}
                id={letter}
                src={link}
            >
            </audio>{letter}
        </div>
    );

}

export default Drumpads;