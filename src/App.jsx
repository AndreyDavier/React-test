import React from 'react';
import './App.css';
import Button from './components/Button/Button';
import Journalitem from './components/Journalitem/Journalitem';
import CardButton from './components/CardButton/CardButton';
import LeftPanel from "./layouts/LeftPanel/LeftPanel"
import Body from './layouts/Body/Body';

function App() {

  const data = [
    {
      title: "Подготовка к обновлению курсов",
      text: "Горные походы открывают удивительные природные ландшафты",
      date: new Date()
    },
    {
      title: "Поход в годы",
      text: "Думал, что очень много време...",
      date: new Date()
    },

  ]

  return (
    <div className='app'>

      <LeftPanel>

      </LeftPanel>

      <Body>

      </Body>
      <CardButton>
        <Journalitem
          title={data[0].title}
          text={data[0].text}
          data={data[0].date}
        />
      </CardButton>
      <CardButton>
        <Journalitem
          title={data[1].title}
          text={data[1].text}
          data={data[1].date}
        />
      </CardButton>
    </div>

  )
}

export default App
