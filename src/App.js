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
      letter: 'Q',
      id: 'Heater-1',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    2: {
      letter: 'W',
      id: 'Heater-2',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    3: {
      letter: 'E',
      id: 'Heater-3',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    4: {
      letter: 'A',
      id: 'Heater-4',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    5: {
      letter: 'S',
      id: 'Clap',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    6: {
      letter: 'D',
      id: 'Open-HH',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    7: {
      letter: 'Z',
      id: "Kick-n'-Hat",
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    8: {
      letter: 'X',
      id: 'Kick',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    9: {
      letter: 'C',
      id: 'Closed-HH',
      link: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }

  }
};

function App() {

  const default_volume = 30

  const [setInUse, updateSet] = useState(sets.set2);
  const [powered, updatePower] = useState(true);
  const [display, setDisplay] = useState("Welcome");
  const [volume, setVolume] = useState(default_volume);

  const updateVolume = (event) => {
    setVolume(event.target.value);
    setDisplay(`Volume: ${volume}`);
  }
  const togglePower = () => {
    updatePower(powered === true ? false : true);
  }
  const toggleSet = () => {
    updateSet(setInUse === sets.set1 ? sets.set2 : sets.set1);
    console.log(setInUse.name);
  }

  const playPad = (element) => {
    if (element && powered) {
      element.currentTime = 0;
      element.volume = volume / 100;
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
            Object.keys(setInUse).map((pads) => {
              if (pads !== 'name') {
                const { id, letter, link } = setInUse[pads];
                return (
                  <Drumpads
                    key={id}
                    id={id}
                    letter={letter}
                    link={link}
                    onClick={handleClick}
                  />
                );
              }
              return null;
            })
          }
        </div>
        <div id="controls-container">
          <div id="toggle-container">
            <button onClick={togglePower}>Power</button>
            <button onClick={toggleSet}>Bank</button>
          </div>
          <div id="display">{display}</div>
          <div id="slider-container">
            <input
              id="volume-slider"
              type="range"
              min="0"
              max="100"
              defaultValue={default_volume}
              onChange={updateVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
