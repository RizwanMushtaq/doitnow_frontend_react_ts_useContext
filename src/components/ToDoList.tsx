import React, {useState, useEffect} from 'react'
import Style from './ToDoList.module.scss'
import { apiEndPoints } from '../config/apiEndPoints'
import axios from 'axios'

import { logWithDebug } from '../utils/logHandling'
import plusIcon from '../assets/images/plus-svgrepo-com.svg'
import deleteIcon from '../assets/images/Papierkorb.svg'
import format from 'date-fns/format'

interface ToDoListProps {
    selectedDate: Date
    updateToDoList: boolean
    setUpdateToDoList: (value: boolean | ((prevVar: boolean) => boolean)) => void
    setShowAddToDoItemDialog: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

interface ToDoListData {
        Item_ID: any
        B_ID: number
        Todo: string
        Date: string
        Done: string
}

const ToDoList: React.FC<ToDoListProps> = ({selectedDate, updateToDoList, setUpdateToDoList, setShowAddToDoItemDialog}) => {

    let [data, setData] = useState<ToDoListData[]>([])
    let [isValidData, setIsValidData] = useState(false)
    const selectedDateForRendering = format(selectedDate, 'dd') + '.' + format(selectedDate, 'MM') + '.' + format(selectedDate, 'yyyy')

    const handleAddTodoIconClick = () => {
        logWithDebug('handleAddTodoIconClick function')
        setShowAddToDoItemDialog(true)
    }
    const handleCheckboxClick = (event: any) => {
        logWithDebug('handleCheckboxClick function')

        let bearerToken = localStorage.getItem('BearerToken')
        let state = event.target.checked
        let itemId = event.target.id

        if(bearerToken){
            axios.post(
                apiEndPoints.updateDoneState,
                {
                    "state": state,
                    "itemId": itemId
                },
                {
                    headers: {
                        'Authorization': bearerToken
                    }
                }
            )
            .then( (response) => {
                if(response.data.result === 'success'){
                    logWithDebug('todo item done state is updated accordingly')
                    setUpdateToDoList( previousState => !previousState)
                } else {
                    logWithDebug('error: todo item done state is not updated accordingly')
                }
            })
            .catch( (error) => {
                throw error
            })
        }
    }
    const handleDeleteIconClick = (event: any) => {
        logWithDebug('handleDeleteIconClick function')

        let bearerToken = localStorage.getItem('BearerToken')
        let itemId = event.target.id

        if(bearerToken){
            axios.post(
                apiEndPoints.deleteTodoItem,
                {
                    "itemId": itemId
                },
                {
                    headers: {
                        'Authorization': bearerToken
                    }
                }
            )
            .then( (response) => {
                if(response.data.result === 'success'){
                    logWithDebug('todo item is deleted successfully')
                    setUpdateToDoList( previousState => !previousState)
                } else {
                    logWithDebug('error: todo item done state is not updated accordingly')
                }
            })
            .catch( (error) => {
                throw error
            })
        }

    }

    useEffect( () => {
        let bearerToken = localStorage.getItem('BearerToken')
        const userID = localStorage.getItem('userID')
        const selectedDateFormat = format(selectedDate, 'dd') + '.' + format(selectedDate, 'MM') + '.' + format(selectedDate, 'yyyy')

        if(bearerToken){
            axios.post(
                apiEndPoints.getTodosForDateSelected,
                {
                    "userID": userID,
                    "selectedDate": selectedDateFormat
                },
                {
                    headers: {
                        'Authorization': bearerToken
                    }
                }
            )
            .then( (response) => {
                if(JSON.stringify(response.data) === JSON.stringify({})){
                    logWithDebug('data is null')
                    setIsValidData(false)
                    
                } else {
                    logWithDebug('we got some data')
                    logWithDebug(response.data)
                    setData(response.data)
                    setIsValidData(true)
                }
            })
            .catch( (err) => {
                throw err
            })
        }
    }, [selectedDate, updateToDoList])

    return (
        <div className={Style.container}>
            <div className={Style.Header}>
                <div>{selectedDateForRendering}</div>
                <div className={Style.addToDoDiv} onClick={handleAddTodoIconClick}>
                    <img src={plusIcon} alt='plusIcon'></img>
                </div>
            </div>
            
            <div className={Style.toDoListContainer}>
                    {
                        isValidData && 
                            data.map( (item) => {
                                return(
                                    <div className={Style.todo_ListItem} key={item.Item_ID}>
                                        
                                        {  item.Done 
                                            ?
                                            <div className={Style.todo_checkboxDiv}>
                                                <input 
                                                    type="checkbox" 
                                                    defaultChecked 
                                                    className={Style.todoCheckboxInput} 
                                                    id={item.Item_ID}
                                                    onChange={handleCheckboxClick}
                                                />
                                            </div>
                                            :
                                            <div className={Style.todo_checkboxDiv}>
                                                <input 
                                                    type="checkbox" 
                                                    className={Style.todoCheckboxInput} 
                                                    id={item.Item_ID}
                                                    onChange={handleCheckboxClick}
                                                />
                                            </div>
                                        }

                                        {   item.Done
                                            ?
                                            <div className={Style.todo_item}>
                                                <div className={Style.todo_item_done}>{item.Todo}</div>
                                            </div>
                                            :
                                            <div className={Style.todo_item}>
                                                <div>{item.Todo}</div>
                                            </div>
                                        } 
                                        
                                        <div className={Style.todo_deleteDiv} >
                                            <img 
                                                src={deleteIcon} 
                                                alt="deleteIcon" 
                                                id={item.Item_ID}
                                                onClick={handleDeleteIconClick}
                                            />
                                        </div>
                                    </div>
                            )})
                    }

                    {
                        !isValidData && 
                            <div>No items to display</div>
                    }
            </div>
            
        </div>
    )
}

export default ToDoList
