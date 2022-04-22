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
    const response = await axios('http://localhost:8000/languages')
    setLanguages(response.data)
  }

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  const translate = async () => {
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios('http://localhost:8000/translation', {
      params: data
    })
    setTranslatedText(response.data)
  }

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
