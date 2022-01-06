import React, {useState, useEffect} from 'react'
import Style from './ToDoList.module.scss'
import { apiEndPoints } from '../config/apiEndPoints'
import axios from 'axios'

import plusIcon from '../assets/images/plus-svgrepo-com.svg'
import deleteIcon from '../assets/images/Papierkorb.svg'
import format from 'date-fns/format'

interface ToDoListProps {
    selectedDate: Date
    updateToDoList: boolean
}

interface ToDoListData {
        Item_ID: any
        B_ID: number
        Todo: string
        Date: string
        Done: string
}

const ToDoList: React.FC<ToDoListProps> = ({selectedDate, updateToDoList}) => {

    let [data, setData] = useState<ToDoListData[]>([])
    let [isValidData, setIsValidData] = useState(false)
    const selectedDateForRendering = format(selectedDate, 'dd') + '.' + format(selectedDate, 'MM') + '.' + format(selectedDate, 'yyyy')

    const handleAddTodoIconClick = () => {
        console.log('handleAddTodoIconClick function')
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
                    console.log('data is null')
                    setIsValidData(false)
                    
                } else {
                    console.log('we got some data')
                    console.log(response.data)
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
                                                <input type="checkbox" defaultChecked className={Style.todoCheckboxInput} id={item.Item_ID}/>
                                            </div>
                                            :
                                            <div className={Style.todo_checkboxDiv}>
                                                <input type="checkbox" className={Style.todoCheckboxInput} id={item.Item_ID}/>
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
                                            <img src={deleteIcon} alt="deleteIcon" id={item.Item_ID}/>
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
