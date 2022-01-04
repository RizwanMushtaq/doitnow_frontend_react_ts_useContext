import React, {useState, useEffect} from 'react'
import Style from './Calender.module.scss'
import axios from 'axios'
import { apiEndPoints } from '../config/apiEndPoints'
import { logWithDebug } from '../utils/logHandling'
import { format, isSameMonth, isSameDay, subMonths, addMonths } from 'date-fns'
import { takeMonth } from '../helpers/calenderLogic'
import arrowiconlogo from '../assets/images/Pfeilrechts.svg'

const Calender: React.FC = () => {

    let [calenderDate, setCalenderDate] = useState(new Date())
    let data = takeMonth(calenderDate)()

    let [selectedDate, setSelectedDate] = useState(new Date())
    let [dateListWithTodos, setDateListWithTodos] = useState([])
    let todayDate = new Date()

    const handleDaysDivClickevent = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log('handleDaysDivClickevent')
        if(event.target as Element){
            let selectedDay = +((event.target as Element).firstChild!.textContent!)

            const selectedMonthYearString = (event.target as Element).parentElement!.previousElementSibling!.previousElementSibling!.childNodes[1].textContent
            const selectedMonthYearArray = selectedMonthYearString!.split(' ')
            let selectedMonth = 0
            switch(selectedMonthYearArray[0]) {
                case 'January':
                    selectedMonth = 0
                    break
                case 'February':
                    selectedMonth = 1
                    break
                case 'March':
                    selectedMonth = 2
                    break
                case 'April':
                    selectedMonth = 3
                    break
                case 'May':
                    selectedMonth = 4
                    break
                case 'June':
                    selectedMonth = 5
                    break
                case 'July':
                    selectedMonth = 6
                    break
                case 'August':
                    selectedMonth = 7
                    break
                case 'September':
                    selectedMonth = 8
                    break
                case 'October':
                    selectedMonth = 9
                    break
                case 'November':
                    selectedMonth = 10
                    break
                case 'December':
                    selectedMonth = 11
                    break
            }
            let selectedYear = +selectedMonthYearArray[1]

            setSelectedDate(new Date(selectedYear, selectedMonth, selectedDay))
        }
    }
    const handlePreviousMonth = ()=>{
        logWithDebug('In handlePreviousMonth')
        setCalenderDate(subMonths(calenderDate, 1))
    }
    const handleNextMonth = ()=>{
        logWithDebug('In handleNextMonth function')
        setCalenderDate(addMonths(calenderDate, 1))
    }

    const showDataAsHTML = data.map( (week) => 
        week.map( (day: any) => {
            if (!isSameMonth(day, calenderDate)){
                return <div className={Style.otherDays} key={day} >
                    <div>{format(day, 'dd')}</div>
                    <div>
                        {
                            dateListWithTodos.map( (item) => {
                                if(isSameDay(day, item)){
                                    return <div key={day} className={Style.dotDiv}></div>
                                }
                                return null 
                            })
                        }
                    </div>
                </div>
            } else {
                if(isSameDay(day, todayDate)){
                    if(isSameDay(day, selectedDate )){
                        return <div key={day} className={`${Style.activeDays} ${Style.todayDate} ${Style.selectedDay}`} id='selectedDay' onClick={handleDaysDivClickevent} >
                                    <div>{format(day, 'dd')}</div>
                                    <div>
                                        {
                                            dateListWithTodos.map( (item) => {
                                                if(isSameDay(day, item)){
                                                    return <div key={day} className={Style.dotDiv}></div>
                                                }
                                                return null  
                                            })
                                        }
                                    </div>
                                </div>
                    } else{
                        return <div key={day} className={`${Style.todayDate} ${Style.activeDays}`} onClick={handleDaysDivClickevent} >
                                    <div>{format(day, 'dd')}</div>
                                    <div>
                                        {
                                            dateListWithTodos.map( (item) => {
                                                if(isSameDay(day, item)){
                                                    return <div key={day} className={Style.dotDiv}></div>
                                                }
                                                return null  
                                            })
                                        }
                                    </div>
                                </div>
                    }
                } else {
                    if(isSameDay(day, selectedDate )){
                        return <div key={day} className={`${Style.activeDays} ${Style.selectedDay}`} onClick={handleDaysDivClickevent} id='selectedDay'>
                                    <div>{format(day, 'dd')}</div>
                                    <div>
                                        {
                                            dateListWithTodos.map( (item) => {
                                                if(isSameDay(day, item)){
                                                    return <div key={day} className={Style.dotDiv}></div>
                                                }
                                                return null  
                                            })
                                        }
                                    </div>
                                </div>
                    } else {
                        return <div key={day} className={Style.activeDays} onClick={handleDaysDivClickevent} >
                                    <div>{format(day, 'dd')}</div>
                                    <div>
                                        {
                                            dateListWithTodos.map( (item) => {
                                                if(isSameDay(day, item)){
                                                    return <div key={day} className={Style.dotDiv}></div>
                                                }
                                                return null  
                                            })
                                        }
                                    </div>
                                </div>
                    }
                } 
            } 
                    
        })
    )

    useEffect( () => {
        let bearerToken = localStorage.getItem('BearerToken' || '')
        let userID = localStorage.getItem('userID')
        if(bearerToken){
            const config = {
                headers: { 
                    'Authorization': bearerToken
                }
            };

            axios.post(
                apiEndPoints.getAllTodosForUser,
                {
                    "userID": userID
                },
                config
            )
            .then( (res) => {
                console.log(res)
            })
            .catch( (err) => {
                throw err
            })
        }
    })

    return (
        <div className={Style.container}>
            <div className={Style.monthDiv}>
                <div className={Style.previousMonth}>
                    <img src={arrowiconlogo} alt='previous' id='previousMonth' onClick={handlePreviousMonth}></img>
                </div>
                <div id='monthHeaderDiv'>
                    {format(calenderDate, 'MMMM')} {format(calenderDate, 'yyyy')}
                </div>
                <div className={Style.nextMonth}>
                    <img src={arrowiconlogo} alt='previous' id='nextMonth' onClick={handleNextMonth}></img>
                </div>
            </div>
            <div className={Style.weekDiv}>
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            <div className={Style.daysDiv} id={'daysDiv'}>
                {showDataAsHTML}
            </div>
        </div>
    )
}

export default Calender
