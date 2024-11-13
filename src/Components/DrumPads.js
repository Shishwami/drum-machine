function Drumpads({ id, link, letter, onClick,powered }) {
    return (
        <div
            key={id}
            id={id}
            data-letter={letter}
            onClick={onClick}
            className="drum-pad"
            data-powered={powered}
            data-played={false}
        >
            <audio
                key={letter}
                id={letter}
                src={link}
                className="clip"
            >
            </audio>{letter}
        </div>
    );

}

export default Drumpads;