function Drumpads(id, link, key) {

    <div
        key={id}
        id={id}
    >
        <audio
            key={key}
            id={key}
            src={link}
        >

        </audio>{key}
    </div>

}

export default Drumpads;