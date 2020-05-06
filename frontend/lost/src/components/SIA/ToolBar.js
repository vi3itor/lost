import React, {Component} from 'react'
import { Icon, Menu, Button, Card } from 'semantic-ui-react'
import {connect} from 'react-redux'
import SIASettingButton from './SIASettingButton'
import Prompt from './lost-sia/src/Prompt'

import actions from '../../actions'
import * as TOOLS from './lost-sia/src/types/tools'
import * as siaIcons from './lost-sia/src/utils/siaIcons'

const { 
    siaSelectTool, siaGetNextImage, siaGetPrevImage, 
    siaSetFullscreen, selectAnnotation, siaShowImgLabelInput, 
    siaSetTaskFinished, siaLayoutUpdate, siaImgIsJunk
} = actions

class ToolBar extends Component{

    constructor(props) {
        super(props)
        this.state = {
            fullscreenMode: false,
            position: {
                left: 0,
                top: 5,
                width: 40
            },
            showFinishPrompt: false,
            showHelp: false
        }
        this.toolBarGroup = React.createRef()
    }

    componentDidMount(){
        
    }
    componentDidUpdate(prevProps, prevState){
        if (prevState.fullscreenMode !== this.state.fullscreenMode){
            this.props.siaSetFullscreen(this.state.fullscreenMode)
        }

        if (this.props.layoutUpdate !== prevProps.layoutUpdate){
            this.calcPosition()
        }
        if (this.props.svg !== prevProps.svg){
            this.calcPosition()
        }

    }

    onClick(e, tool){
        this.props.siaSelectTool(tool)
    }

    calcPosition(){
        const tb = this.toolBarGroup.current.getBoundingClientRect()
        if (tb){
            if (this.props.svg){
                let toolBarTop = undefined
                toolBarTop = this.props.svg.top + (this.props.svg.height - tb.height)/2
                this.setState({
                    position: {...this.state.position,
                    left: this.props.svg.left - 50,
                    top: toolBarTop,
                    }
                })
            }
        }
    }
    getNextImg(){
        // this.props.siaSetImageLoaded(false)
        // this.props.selectAnnotation(undefined)
        this.props.siaGetNextImage(this.props.currentImage.id)
        console.log("TOOLBAR - wrongLoad - getNextImg", this.props.currentImage.id)
    }

    getPrevImg(){
        // this.props.siaSetImageLoaded(false)
        // this.props.selectAnnotation(undefined)
        this.props.siaGetPrevImage(this.props.currentImage.id)
        console.log("TOOLBAR - wrongLoad - getPrevImg", this.props.currentImage.id)
    }

    setFinished(){
        this.props.siaSetTaskFinished()
        
    }

    toggleFinishPrompt(){
        this.setState({
            showFinishPrompt: !this.state.showFinishPrompt
        })
    }

    toggleFullscreen(){
        // this.props.selectAnnotation(undefined)
        this.setState({
            fullscreenMode: !this.state.fullscreenMode
        })
        // this.props.siaSetFullscreen(!this.props.fullscreenMode)
    }

    toggleImgLabelInput(){
        this.props.siaShowImgLabelInput(!this.props.imgLabelInput.show)
    }

    toggleJunk(){
        this.props.siaImgIsJunk(!this.props.isJunk)
    }

    toggleHelp(){
        this.setState({showHelp: !this.state.showHelp})
    }

    handleOnDeleteAllAnnos(){
        if(this.props.onDeleteAllAnnos){
            this.props.onDeleteAllAnnos()
        }
    }

    renderPointIcon(){
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
                // x="0px" y="0px"
                // width="1190.549px" height="841.891px" 
                viewBox="0 0 1190.549 841.891" 
                width="17px"
            >
                <path fill="currentColor" d="M748.197,408.286c0,151.355-122.699,274.058-274.059,274.058c-151.357,0-274.057-122.703-274.057-274.058
                    c0-151.356,122.7-274.057,274.057-274.057C625.497,134.229,748.197,256.929,748.197,408.286z"/>
            </svg>
        )
    }

    renderLineIcon(){
        return (
            <svg version="1.1" id="Linie" xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                // width="1190.549px" height="841.891px" 
                viewBox="0 0 1190.549 841.891" 
                width="17px"
                // enable-background="new 0 0 1190.549 841.891"
                // xml:space="preserve"
                >
                <path fill="currentColor" d="M986.331,109.582c7.141-10.669,28.926-51.179-2.968-85.299S891.011,8.972,891.011,8.972L539.125,133.474
                    L63.239,302.022c-21.503,7.998-53.586,30.072-60.956,61.716s-2.116,58.538,22.414,96.79S211.33,752.213,228.564,777.28
                    c26.453,36.868,62.16,58.042,105.507,57.154s365.665-7.485,365.665-7.485l331.7-8.325l89.453-2.293c0,0,70.998-7.179,69.861-60.287
                    c-1.135-53.108-74.618-62.721-74.618-62.721s-733.215,15.553-749.148,15.576c-22.688,0.201-45.355-15.278-54.146-28.928
                    s-175.79-272.956-175.79-272.956l600.587-212.338c0,0-73.179,67.087-99.315,100.041s-30.56,74.565-5.053,95.237
                    c31.188,24.081,91.974-3.708,123.127-39.312C782.35,323.912,979.191,120.251,986.331,109.582z"/>
            </svg>
        )
    }

    renderBBoxIcon(){
        return (
            <svg version="1.1" id="Linie" xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                // width="1190.549px" height="841.891px" 
                viewBox="0 0 1190.549 841.891" 
                width="17px"
                // enable-background="new 0 0 1190.549 841.891"
                // xml:space="preserve"
                >
                <path fill="none" stroke="currentColor" strokeWidth="120" strokeMiterlimit="10" d="M929.775,710.655
                    c0,23.386-19.134,42.52-42.52,42.52H278.991c-23.386,0-42.52-19.134-42.52-42.52V102.392c0-23.386,19.134-42.52,42.52-42.52
                    h608.264c23.386,0,42.52,19.134,42.52,42.52V710.655z"/>
            </svg>
        )
    }

    renderPolygonIcon(){
        return (
            <svg version="1.1" id="Linie" xmlns="http://www.w3.org/2000/svg"
                // xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                // width="1190.549px" height="841.891px" 
                viewBox="0 0 1190.549 841.891" 
                width="17px"
                // enable-background="new 0 0 1190.549 841.891"
                // xml:space="preserve"
                >
                <path fill="none" stroke="currentColor" strokeWidth="120" strokeMiterlimit="10" d="M342.327,769.938
                    c-23.379,0.548-52.922-15.056-65.65-34.674L65.479,409.738c-12.729-19.619-5.085-41.998,16.984-49.732L917.331,67.421
                    c22.07-7.734,26.86-0.275,10.645,16.576L691.761,329.475c-16.216,16.852-14.503,42.542,3.807,57.092l425.212,337.901
                    c18.31,14.549,14.16,26.901-9.219,27.449L342.327,769.938z"/>
            </svg>
        )
    }

    renderToolButtons(){
        if (!this.props.allowedActions.draw) return null
        let btns = []
        if (this.props.allowedTools.point){
            btns.push(
                <Menu.Item name='dot circle' key={TOOLS.POINT}
                    active={this.props.selectedTool===TOOLS.POINT} 
                    onClick={e => this.onClick(e, TOOLS.POINT)}
                >
                    {/* <Icon name='dot circle' /> */}
                    {this.renderPointIcon()}
                </Menu.Item>
                // <Button key={TOOLS.POINT} outline onClick={e => this.onClick(e, TOOLS.POINT)} color="primary">
                //     <FontAwesomeIcon icon={faDotCircle} size='1x' />
                // </Button>
            )
        }
        if (this.props.allowedTools.line){
            btns.push(
                <Menu.Item name='paint brush' key={TOOLS.LINE}
                    active={this.props.selectedTool===TOOLS.LINE} 
                    onClick={e => this.onClick(e, TOOLS.LINE)}
                >
                    {/* <Icon name='paint brush' /> */}
                    {/* <FontAwesomeIcon icon={faWaveSquare} size="1x"/> */}
                    {this.renderLineIcon()}
                </Menu.Item>
                // <Button key={TOOLS.LINE} outline onClick={e => this.onClick(e, TOOLS.LINE)} color="secondary">
                //     <FontAwesomeIcon icon={faWaveSquare} size="1x"/>
                // </Button>
            )
        }
        if (this.props.allowedTools.bbox){
            btns.push(
                <Menu.Item name='square outline' key={TOOLS.BBOX}
                    active={this.props.selectedTool===TOOLS.BBOX} 
                    onClick={e => this.onClick(e, TOOLS.BBOX)}
                >
                    {/* <Icon name='square outline' /> */}
                    {this.renderBBoxIcon()}
                </Menu.Item>
                // <Button key={TOOLS.BBOX} outline onClick={e => this.onClick(e, TOOLS.BBOX)} color="success">
                //     <FontAwesomeIcon icon={faVectorSquare} size="1x"/>
                // </Button>
            )
        }
        if (this.props.allowedTools.polygon){
            btns.push(
                <Menu.Item name='pencil alternate' key={TOOLS.POLYGON}
                    active={this.props.selectedTool===TOOLS.POLYGON} 
                    onClick={e => this.onClick(e, TOOLS.POLYGON)}
                >
                    {/* <Icon name='pencil alternate' /> */}
                    {/* <FontAwesomeIcon icon={faDrawPolygon} size="1x"/> */}
                    {this.renderPolygonIcon()}
                </Menu.Item>
                // <Button key={TOOLS.POLYGON} outline onClick={e => this.onClick(e, TOOLS.POLYGON)} color="info">
                //     <FontAwesomeIcon icon={faDrawPolygon} size="1x"/>
                // </Button>
            )
        }
        return btns
    }

    renderFinishPrompt(){
        return (
            <Prompt active={this.state.showFinishPrompt}
                header={<div>
                    <Icon name='paper plane outline'></Icon>
                    Do you wish to FINISH this SIA Task?
                </div>}
                content={<div>
                    <Button basic color="green" inverted
                        onClick={() => this.setFinished()}
                    >
                        <Icon name='check'></Icon>
                        Yes
                    </Button>
                    <Button basic color="red" inverted
                        onClick={() => this.toggleFinishPrompt()}
                    >
                        <Icon name='ban'></Icon> No
                    </Button>
                </div>}
            />
        )
    }
    /**
     * Render next and prev image buttons 
     *
     */
    renderNavigation(){
        let btns = []
        if (this.props.currentImage){
            if (this.props.currentImage.isLast){
                btns.push(
                    <Menu.Item name='paper plane outline' key='finish'
                        active={false} 
                        onClick={() => this.toggleFinishPrompt()}
                    >
                        <Icon name='paper plane outline' />
                        {this.renderFinishPrompt()}
                    </Menu.Item>
                    // <Button key='finish' outline onClick={() => this.setFinished()} color="primary" >
                    //     <FontAwesomeIcon icon={faPaperPlane} />
                    // </Button>
                )
            } else {
                btns.push(
                    <Menu.Item name='arrow right'  key='next'
                        active={false} 
                        onClick={() => this.getNextImg()}
                    >
                        <Icon name='arrow right' />

                    </Menu.Item>
                    // <Button key='next' outline onClick={() => this.getNextImg()} color="primary">
                    //     <FontAwesomeIcon icon={faArrowRight} />
                    // </Button>
                )
            }
            btns.push(
                    <Menu.Item name='arrow left' key='prev'
                        active={false} 
                        onClick={() => this.getPrevImg()}
                        disabled={this.props.currentImage.isFirst}
                    >
                        <Icon name='arrow left' />
                    </Menu.Item>
                // <Button key='prev' outline onClick={() => this.getPrevImg()} color="primary" disabled={!this.props.currentImage ? false : this.props.currentImage.isFirst}>
                //     <FontAwesomeIcon icon={faArrowLeft} />
                // </Button>
            )
        }
           
            
        return btns
    }

    renderJunkButton(){
        return <Menu.Item name='ban' key='junk'
            active={this.props.isJunk} 
            onClick={() => this.toggleJunk()}
        >
            <Icon name='ban' />
        </Menu.Item>
    }

    renderDeleteAllAnnosButton(){
        return <Menu.Item name='trash alternate outline' key='deleteAllAnnos'
            onClick={() => this.handleOnDeleteAllAnnos()}
        >
            <Icon name='trash alternate outline' />
        </Menu.Item>
    }

    renderHelpButton(){
        return <Menu.Item name='help' key='help'
            active={false} 
            onClick={() => this.toggleHelp()}
        >
            <Icon name='help' />
            <Prompt active={this.state.showHelp}
                // header={<div><Icon name='help' /> Help</div>}
                content={<div>
                    <Card.Group>
                    <Card>
                        <Card.Content header='How to draw?' />
                        <Card.Content description='1.) Select a Tool in the toolbar 2.) Draw with RIGHT CLICK on Canvas' />
                    </Card>
                    <Card>
                        <Card.Content header='How to delete an annotation?' />
                        <Card.Content description='1.) Select an annotation with LEFT CLICK 2.) Press DELETE or BACKSPACE' />
                    </Card>
                    <Card>
                        <Card.Content header='How to assign a label?' />
                        <Card.Content description='1.) Select an annotation with LEFT CLICK 2.) Hit ENTER 3.) Type into the input field 4.) Hit ENTER to confirm 5.) Hit ESCAPE to close the input field'/>
                    </Card>
                    <Card>
                        <Card.Content header='Undo/ Redo' />
                        <Card.Content description='Undo: Hit STRG + Z'/>
                        <Card.Content description='Redo: Hit STRG + R'/>
                    </Card>
                    <Card>
                        <Card.Content header='Add a node to Line/Polygon' />
                        <Card.Content description='Hit STRG + Click left on the line'/>
                    </Card>
                    <Card>
                        <Card.Content header='Zoom/ Move Canvas' />
                        <Card.Content description='Zoom: Use MOUSE WHEEL to zoom in/out'/>
                        <Card.Content description='Move: Hold MOUSE WHEEL and move mouse. Or Use W/A/S/D keys to move camera up/left/down/right'/>
                    </Card>
                    <Card>
                        <Card.Content header='TAB navigation' />
                        <Card.Content description='You can traverse all visible annotation by hitting TAB.'/>
                    </Card>
                    <Card>
                        <Card.Content header='Next/Prev image navigation' />
                        <Card.Content description='Get next image by hitting ARROW_RIGHT key. Get previous image by hitting ARROW_LEFT key.'/>
                    </Card>
                    </Card.Group>
                </div>}
            />
        </Menu.Item>
    }

    
    renderImgLabelInput(){
        if (this.props.canvasConfig.img.actions.label){
            return <Menu.Item name='img label input' 
                active={this.props.imgLabelInput.show} 
                onClick={() => this.toggleImgLabelInput()}
            >
                {/* <Icon name='pencil' /> */}
                {siaIcons.textIcon()}
                
            </Menu.Item>
        }
    }

    render(){
        console.log('Toobar state', this.state, this.props.currentImage)
        return(
        <div
            ref={this.toolBarGroup}
            style={{position:'fixed', top: this.state.position.top, left:this.state.position.left}}>
            <Menu icon inverted vertical>
                {this.renderImgLabelInput()}
                {this.renderNavigation()}
                {this.renderToolButtons()}
                <Menu.Item name='expand arrows alternate' 
                    active={this.props.fullscreenMode} 
                    onClick={() => this.toggleFullscreen()}
                >
                    <Icon name='expand arrows alternate' />
                </Menu.Item>
                {this.renderJunkButton()}
                {this.renderDeleteAllAnnosButton()}
                <SIASettingButton></SIASettingButton>
                {this.renderHelpButton()}
            </Menu>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        currentImage: state.sia.annos.image,
        fullscreenMode: state.sia.fullscreenMode,
        annos: state.sia.annos,
        appliedFullscreen: state.sia.appliedFullscreen,
        layoutUpdate: state.sia.layoutUpdate,
        imgLabelInput: state.sia.imgLabelInput,
        allowedTools: state.sia.config.tools,
        allowedActions: state.sia.config.annos.actions,
        selectedTool: state.sia.selectedTool,
        isJunk: state.sia.isJunk,
        canvasConfig: state.sia.config,
        svg: state.sia.svg,
    })
}
export default connect(mapStateToProps, 
    {siaSelectTool, siaGetNextImage, siaGetPrevImage, 
        siaSetFullscreen, 
        // siaSetImageLoaded, 
        selectAnnotation, siaShowImgLabelInput, siaSetTaskFinished, siaLayoutUpdate,
        siaImgIsJunk
    }
)(ToolBar)