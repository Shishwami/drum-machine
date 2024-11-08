function Drumpads({id, link, letter}) {

    return (
        <div
            key={id}
            id={id}
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