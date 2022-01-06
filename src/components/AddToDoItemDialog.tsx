import React from 'react'
import Style from './AddToDoItemDialog.module.scss'

import { format } from 'date-fns'

interface AddToDoItemDialogProps {
    selectedDate: Date
}

const AddToDoItemDialog:React.FC<AddToDoItemDialogProps> = ({selectedDate}) => {

    const selectedDateForRendering = format(selectedDate, 'dd') + '.' + format(selectedDate, 'MM') + '.' + format(selectedDate, 'yyyy')
    const handleCancelButtonClick = () => {
        console.log('handleCancelButtonClick function')
    }
    const handleSaveButtonClick = () => {
        console.log('handleSaveButtonClick function')
    }

    return (
        <div className={Style.container}>
            <div></div>
            <div className={Style.dialogBox}>
                <div className={Style.dateLabel}>{selectedDateForRendering}</div>
                <textarea className={Style.textArea} id='toDoTextArea' placeholder="Write your Todo Item.."/>
                <div className={Style.buttonContainer}>
                    <button onClick={handleCancelButtonClick}>Cancel</button>
                    <button onClick={handleSaveButtonClick}>Save</button>
                </div>
            </div> 
        </div>
    )
}

export default AddToDoItemDialog
