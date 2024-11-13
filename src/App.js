import './App.css';
import Drumpads from './Components/DrumPads';
import { useEffect, useState } from 'react';

const sets = {
  set1: {
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

  },
  set2: {
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
};

function App() {

  const default_volume = 30;
  const default_set = sets.set1
  const default_powered = true;
  const default_msg = "Welcome"

  const [powered, updatePower] = useState(default_powered);
  const [setInUse, updateSet] = useState(default_set);
  const [display, setDisplay] = useState(default_msg);
  const [volume, setVolume] = useState(default_volume);


  const togglePower = () => {
    updatePower(powered === true ? false : true);
    updateDisplay(" ");
    document.getElementById("volume-slider").disabled = powered;

    if (!powered) {
      updateDisplay(default_msg);
    }
  }
  const toggleSet = () => {
    if (powered) {
      updateSet(setInUse === sets.set1 ? sets.set2 : sets.set1);
      updateDisplay(setInUse.name);
    }
  }
  const updateDisplay = (text) => {
    setDisplay(text);
  }
  const updateVolume = (event) => {
    if (powered) {
      setVolume(event.target.value);
      updateDisplay(`Volume: ${event.target.value}`);
    }
  }



  const playPad = (element, parent) => {
    if (element && powered) {
      element.currentTime = 0;
      element.volume = volume / 100;
      element.play();


      let timeoutId;
      parent.setAttribute('data-played', "true");
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        parent.setAttribute('data-played', "false");
      }, 100);

      updateDisplay(parent.id.replace("-", " "));
    }
  };

  const handleClick = (event) => {
    const elementClicked = event.target;
    const audio = elementClicked.querySelector("audio");
    playPad(audio, elementClicked);
  }

  const handleKeyDown = (event) => {
    const elemetPressed = document.querySelector(`[data-letter="${event.key.toUpperCase()}"]`);
    const audio = elemetPressed?.querySelector("audio");
    playPad(audio, elemetPressed);
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

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
                    powered={powered}
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
            <button id="btn-power" onClick={togglePower} data-powered={powered}>Power</button>
            <button id="btn-toggle" onClick={toggleSet} data-powered={powered} data-set-name={setInUse.name}>Bank</button>
          </div>
          <div id="display" data-powered={powered}><p>{display}</p></div>
          <div id="slider-container">
            <input
              id="volume-slider"
              type="range"
              step="1"
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
