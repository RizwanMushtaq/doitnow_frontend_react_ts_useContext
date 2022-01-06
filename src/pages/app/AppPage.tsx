import React, {useState} from 'react'
import Style from './AppPage.module.scss'

import Header from '../../components/Header'
import Calender from '../../components/Calender'
import ToDoList from '../../components/ToDoList'
import Footer from '../../components/Footer'
import AddToDoItemDialog from '../../components/AddToDoItemDialog'

interface AppPageProps {
    setAppState: (value: string | ((prevVar: string) => string)) => void;
}

const AppPage: React.FC<AppPageProps> = ({setAppState}) => {

    let [selectedDate, setSelectedDate] = useState(new Date())
    let [updateToDoList, setUpdateToDoList] = useState(false)
    let [updateCalender, setUpdateCalender] = useState(false)
    let [showAddToDoItemDialog, setShowAddToDoItemDialog] = useState(false)

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
                        updateCalender={updateCalender}
                    />
                </div>
                <div className={Style.todoList}>
                    <ToDoList 
                        selectedDate={selectedDate}
                        updateToDoList={updateToDoList}
                        setUpdateToDoList={setUpdateToDoList}
                        setShowAddToDoItemDialog={setShowAddToDoItemDialog}
                    />
                </div>
            </div>
            <div className={Style.footer}>
                <Footer />
            </div>

            {
                showAddToDoItemDialog && 
                    <AddToDoItemDialog
                        selectedDate={selectedDate}
                        setShowAddToDoItemDialog={setShowAddToDoItemDialog}
                        setUpdateToDoList={setUpdateToDoList}
                    />
            }
        </div>
    )
}

export default AppPage
