function Drumpads({id, link, letter,onClick}) {

    return (
        <div
            id={id}
            data-letter={letter}
            onClick={onClick}
        >
            <audio
                id={letter}
                src={link}
            >

            </audio>{letter}
        </div>
    );

}

export default Drumpads;