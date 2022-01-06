import React, {useState} from 'react'
import Style from './AppPage.module.scss'

import Header from '../../components/Header'
import Calender from '../../components/Calender'
import ToDoList from '../../components/ToDoList'
import Footer from '../../components/Footer'

interface AppPageProps {
    setAppState: (value: string | ((prevVar: string) => string)) => void;
}

const AppPage: React.FC<AppPageProps> = ({setAppState}) => {

    let [selectedDate, setSelectedDate] = useState(new Date())
    let [updateToDoList, setUpdateToDoList] = useState(false)

    return (
        <div className={Style.container}>
            <div className={Style.header}>
                <Header setAppState={setAppState}/>
            </div>
            <div className={Style.body}>
                <div className={Style.calender}>
                    <Calender 
                        selectedDate={selectedDate} 
                        setSelectedDate={setSelectedDate}
                        setUpdateToDoList={setUpdateToDoList}
                    />
                </div>
                <div className={Style.todoList}>
                    <ToDoList 
                        selectedDate={selectedDate}
                        updateToDoList={updateToDoList}
                    />
                </div>
            </div>
            <div className={Style.footer}>
                <Footer />
            </div>
        </div>
    )
}

export default AppPage
