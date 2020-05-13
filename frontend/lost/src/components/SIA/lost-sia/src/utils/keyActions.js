export const EDIT_LABEL='editLabel'
export const DELETE_ANNO='deleteAnno'
export const ENTER_ANNO_ADD_MODE='enterAnnoAddMode'
export const LEAVE_ANNO_ADD_MODE='leaveAnnoAddMode'
export const UNDO='undo'
export const REDO='redo'
export const TRAVERSE_ANNOS='traverseAnnos'
export const CAM_MOVE_UP='camMoveUp'
export const CAM_MOVE_DOWN='camMoveDown'
export const CAM_MOVE_LEFT='camMoveLeft'
export const CAM_MOVE_RIGHT='camMoveRight'
export const CAM_MOVE_STOP='camMoveStop'
export const LABEL_AS_1='labelAs1'
export const LABEL_AS_2='labelAs2'
export const LABEL_AS_3='labelAs3'
export const LABEL_AS_4='labelAs4'
export const LABEL_AS_5='labelAs5'


class KeyMapper{
    constructor(keyActionHandler=undefined){
        this.controlDown = false
        this.keyActionHandler = keyActionHandler
    }

    keyDown(key){
        switch (key){
            case 'Enter':
                this.triggerKeyAction(EDIT_LABEL)
                break
            case 'Delete':
                this.triggerKeyAction(DELETE_ANNO)
                break
            case 'Backspace':
                this.triggerKeyAction(DELETE_ANNO)
                break
            case 'Control':
                this.controlDown = true
                this.triggerKeyAction(ENTER_ANNO_ADD_MODE)
                break
            case 'z':
                if (this.controlDown){
                    this.triggerKeyAction(UNDO)
                }
                break
            case 'r':
                if (this.controlDown){
                    this.triggerKeyAction(REDO)
                }
                break
            case 'Tab':
                this.triggerKeyAction(TRAVERSE_ANNOS)
                break
            case 'w':
                this.triggerKeyAction(CAM_MOVE_UP)
                break
            case 's':
                this.triggerKeyAction(CAM_MOVE_DOWN)
                break
            case 'a':
                this.triggerKeyAction(CAM_MOVE_LEFT)
                break
            case 'd':
                this.triggerKeyAction(CAM_MOVE_RIGHT)
                break
            case '1':
                this.triggerKeyAction(LABEL_AS_1)
                break
            case '2':
                this.triggerKeyAction(LABEL_AS_2)
                break
            case '3':
                this.triggerKeyAction(LABEL_AS_3)
                break
            case '4':
                this.triggerKeyAction(LABEL_AS_4)
                break
            case '5':
                this.triggerKeyAction(LABEL_AS_5)
                break
            default:
                break
        }
    }

    keyUp(key){
        switch (key){
            case 'Control':
                console.log('KeyMapper Control up')
                this.controlDown = false
                this.triggerKeyAction(LEAVE_ANNO_ADD_MODE)
                break
            default:
                break
        }
    }

    triggerKeyAction(keyAction){
        if (this.keyActionHandler){
            this.keyActionHandler(keyAction)
        }
    }

}

export default KeyMapper