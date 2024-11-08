import logo from './logo.svg';
import './App.css';
import Drumpads from './Components/DrumPads';
import { useEffect, useState } from 'react';

const sets = {
  set1: {
    name: "Smooth Piano Kit",
    1: {
      letter: "Q",
      id: "Chord-1",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    2: {
      letter: "W",
      id: "Chord-2",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    3: {
      letter: "E",
      id: "Chord-3",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    4: {
      letter: "A",
      id: "Shaker",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    5: {
      letter: "S",
      id: "Open-HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    6: {
      letter: "D",
      id: "Closed-HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    7: {
      letter: "Z",
      id: "Punchy-Kick",
      link: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    8: {
      letter: "X",
      id: "Side-Stick",
      link: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    9: {
      letter: "C",
      id: "Snare",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
  },
  set2: {
    name: "Heater Kit",
    1: {
      letter: "Q",
      id: "Chord-1",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    2: {
      letter: "W",
      id: "Chord-2",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    3: {
      letter: "E",
      id: "Chord-3",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    4: {
      letter: "A",
      id: "Shaker",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    5: {
      letter: "S",
      id: "Open-HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    6: {
      letter: "D",
      id: "Closed-HH",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    7: {
      letter: "Z",
      id: "Punchy-Kick",
      link: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    8: {
      letter: "X",
      id: "Side-Stick",
      link: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    9: {
      letter: "C",
      id: "Snare",
      link: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
  }
};

function App() {

  const [setInUse, updateSet] = useState(sets.set2);

  const toggleSet = () => {
    updateSet(setInUse === sets.set1 ? sets.set2 : sets.set1);
  }

  const playPad = (element) => {
    if (element) {
      element.currentTime = 0;
      element.play();
    }
  };

  const handleClick = (event) => {
    const elementClicked = event.target;
    const audio = elementClicked.querySelector("audio");
    playPad(audio);
  }

  const handleKeyDown = (event) => {
    const elemetPressed = document.querySelector(`[data-letter="${event.key.toUpperCase()}"]`);
    const audio = elemetPressed?.querySelector("audio");
    playPad(audio);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }
  );

  return (
    <div className="App">
      <div id="drum-machine">
        <div id="pads-container">
          {
            Object.keys(setInUse).map(pads => {
              const { id, letter, link } = setInUse[pads]
              return (<Drumpads key={id} id={id} letter={letter} link={link} onClick={handleClick} />);
            })
          }
        </div>
        <div id="controls-coontainer">

        </div>
      </div>
    </div>
  );
}

export default App;
