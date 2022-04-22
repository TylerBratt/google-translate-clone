import { useEffect, useState } from 'react'
import axios from "axios"
import { Arrows, Button, Modal, Textbox } from "./components";


const App = () => {

  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('Polish')
  const [showModal, setShowModal] = useState(null)
  const [languages, setLanguages] = useState(null)
  const [textToTranslate, setTextToTranslate] = useState("")
  const [translatedText, setTranslatedText] = useState("")

  const getLanguages = async () => {


const options = {
  method: 'GET',
  url: 'https://google-translate20.p.rapidapi.com/languages',
  headers: {
    'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
    'X-RapidAPI-Key': '6784f1e9afmsh837955dce65ecb1p18fdf8jsn21fcd3082e8f'
  }
};

axios.request(options).then(function (response) {
  const arrayOfData = Object.keys(response.data.data).map(key => response.data.data[key])
  setLanguages(arrayOfData)
}).catch(function (error) {
	console.error(error);
});
  }

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  const translate = () => {
    const options = {
      method: 'GET',
      url: 'https://google-translate20.p.rapidapi.com/translate',
      params: {
        text: textToTranslate,
        tl: outputLanguage,
        sl: inputLanguage
      },
      headers: {
        'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
        'X-RapidAPI-Key': '6784f1e9afmsh837955dce65ecb1p18fdf8jsn21fcd3082e8f'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      setTranslatedText(response.data.data.translation)
    }).catch(function (error) {
      console.error(error);
    });
  }

  console.log("translated", translatedText)

  useEffect(() => {
    getLanguages()
  },[])

  return (
    <div className="app">
      {!showModal && <>
        <Textbox 
          selectedLanguage={inputLanguage}
          style="input" 
          setShowModal={setShowModal}
          setTextToTranslate={setTextToTranslate}
          textToTranslate={textToTranslate}
          setTranslatedText={setTranslatedText}
        />
        <div className="arrow-container" onClick={handleClick}>
          <Arrows />
        </div>
        <Textbox 
          selectedLanguage={outputLanguage}
          style="output" 
          setShowModal={setShowModal}
          translatedText={translatedText}
        />
        <div className='button-container' onClick={translate}>
          <Button /> 
        </div>
      </>}
      

      {showModal && 
      <Modal 
        setShowModal={setShowModal}
        languages={languages}
        chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
        setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
      />}


    </div>
  );
}

export default App;
