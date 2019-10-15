import React, { Component } from "react"
import {
	CardHeader,
	Card,
	CardBody,
	Col,
	Row
} from 'reactstrap'
import { connect } from 'react-redux'
import actions from '../actions'
import ImageSearch from '../components/SIAReview/ImageSearch'
import Canvas from '../components/SIA/Canvas'
const { getSiaReviewFilterOptions, getSiaReviewAnnos,getSiaConfig,getSiaImage,siaSetSVG,siaLayoutUpdate,getSiaLabels, getSiaAnnos} = actions



class SiaReview extends Component {
	constructor(props) {
		super(props)
		const { handle } = this.props.match.params;
		let taskid = parseInt(handle.split('&')[1]);
		this.state = {
			fullscreenCSS: '',
			didMount: false,
			image: {
				id: undefined,
				data: undefined,
			},
			layoutOffset: {
				left: 0,
				top: 0,
				bottom: 10,
				right: 0
			},
			taskId: taskid,
			actualimage:0,
			layoutUpdate:0
		}
		console.log(this.props.history)
		console.log(this.state)
		this.container = React.createRef()
        this.canvas = React.createRef()
		this.callbackNextImage = this.callbackNextImage.bind(this)
		this.callbackPrevImage = this.callbackPrevImage.bind(this)
		console.log(this.props.listOfAnnos)
	}
	componentDidMount() {
		this.props.getSiaReviewFilterOptions()
		this.props.getSiaReviewAnnos()
		this.props.getSiaAnnos(-1)
	
	}


	 componentDidUpdate(prevProps, prevState)
	 {
		console.log('Sia did update', this.container.current.getBoundingClientRect())
		if(prevProps.listOfAnnos[this.state.actualimage] !== this.props.listOfAnnos[this.state.actualimage])
		{
		this.requestImageFromBackend()
		}
		console.log('Sia did update', this.container.current.getBoundingClientRect())
        this.setFullscreen(this.props.fullscreenMode)
        if (prevState.fullscreenCSS !== this.state.fullscreenCSS){
            // this.props.siaAppliedFullscreen(this.props.fullscreenMode)
            this.props.siaLayoutUpdate()
        }
       /*
        if (prevProps.getNextImage !== this.props.getNextImage){
            if (this.props.getNextImage){
                const newAnnos = this.canvas.current.getAnnos()
                this.canvas.current.unloadImage()
                console.log('getNextImage newAnnos', newAnnos)
                this.setState({image: {
                    id: undefined, 
                    data:undefined
                }})
                this.props.siaUpdateAnnos(newAnnos).then((r) => {
                    console.log('SIA REQUEST: Updated Annos', r)
                    this.props.getSiaAnnos(this.props.getNextImage)
                    
                })
                
            }
        }
        if (prevProps.getPrevImage !== this.props.getPrevImage){
            if (this.props.getPrevImage){
                const newAnnos = this.canvas.current.getAnnos()
                this.canvas.current.unloadImage()
                this.setState({image: {
                    id: undefined, 
                    data:undefined
                }})
                this.props.siaUpdateAnnos(newAnnos).then(() => {
                    this.props.getSiaAnnos(this.props.getPrevImage, 'prev')
                })
                
            }
        }
        if (prevProps.taskFinished !== this.props.taskFinished){
            const newAnnos = this.canvas.current.getAnnos()
            this.props.siaUpdateAnnos(newAnnos).then(()=>{
                this.props.siaSendFinishToBackend().then(()=>{
                    this.siteHistory.push('/dashboard')

                })
            })
        }*/
        if(this.props.annos.image){
            if (prevProps.annos.image){
                if(this.props.annos.image.id !== prevProps.annos.image.id){
                    this.requestImageFromBackend()
                }
            } else {
                this.requestImageFromBackend()
            }
        }
    }
	 
	componentWillReceiveProps(prevProps, prevState)
	{
		if(this.props.listOfAnnos[this.state.actualimage])
		{
		this.requestImageFromBackend()
		}
	}

    handleImgBarClose(){
        this.props.siaShowImgBar(false)
    }
	requestImageFromBackend(){
        this.props.getSiaImage(this.props.listOfAnnos[this.state.actualimage].image.url).then(response=>
            {
                this.setState({image: {
                    // ...this.state.image, 
                    id: this.props.listOfAnnos[this.state.actualimage].image.id, 
                    data:window.URL.createObjectURL(response)
                    
                }},()=>console.log("______________________________image",this.state.image.data))
            }
        )       
	}
	setFullscreen(fullscreen = true) {
        if (!true) {
            if (this.state.fullscreenCSS !== 'sia-fullscreen') {
                this.setState({ 
                    fullscreenCSS: 'sia-fullscreen',
                    layoutOffset: {
                        ...this.state.layoutOffset,
                        left: 50,
                    } 
                })
            }
        } else {
            if (this.state.fullscreenCSS !== '') {
                this.setState({
                    fullscreenCSS: '',
                    layoutOffset: {
                        ...this.state.layoutOffset,
                        left: 0,
                    } 
                })
            }
        }
	}

	callbackNextImage()
	{
		if(this.state.actualimage >=0 && this.state.actualimage < this.props.listOfAnnos.length-1)
		{
		
		let imNumber = this.state.actualimage
		imNumber+= 1
		this.setState({actualimage:imNumber},()=>this.requestImageFromBackend())
		}	
		console.log("test")
	}
	callbackPrevImage()
	{
		if(this.state.actualimage >0)
		{
		let imNumber = this.state.actualimage
		imNumber-= 1
		this.setState({actualimage:imNumber},()=>this.requestImageFromBackend())
		}	
		console.log("test")
	}

	render() {
		//                                                           GetWorkingReviewTask || Oder TaskID in URL
		//																										     StartSIAwith


		// GET_SIA_ANNOS_FROMANNOTASKID  ==> Canvas Ausgeben restlichen SIA Funktionen nutzen wie sie sind?
		// 
		//
		// 
		console.log(this.props.listOfAnnos[0])
		console.log(typeof (this.props.listOfPossibleFilters))
		console.log("________________________________", this.props.listOfPossibleFilters)

		const ImageSea = this.props.listOfPossibleFilters ? <ImageSearch annoId={this.state.taskId} filter={this.props.listOfPossibleFilters} parentCallback={this.callbackNextImage} prevImage={this.callbackPrevImage}></ImageSearch> : null
		//const ImageS = this.props.workingOnAnnoTask?<ImageSearch annoId={this.state.taskId} filter={this.props.listOfPossibleFilters}></ImageSearch>:null;
		console.log(this.props.getSiaReviewFilterOptions)
		if (!this.props.listOfPossibleFilters.listOfPossibleLabels || !this.props.listOfPossibleFilters.listOfALLUserInTask ){
			return (
				<div></div>
			)
		}

		//const can = this.props.history.location.state.annoTask? <SIAReviewCanvas annoTask={this.props.history.location.state.annoTask}></SIAReviewCanvas>:null;
		const can = this.state.image.id?	<Canvas
		ref={this.canvas}
		//imgBarVisible={this.props.imgBar.show}
		container={this.container}
		annos={this.props.listOfAnnos[this.state.actualimage]}
		image={this.state.image}
		uiConfig={this.props.uiConfig}
		layoutUpdate={this.state.layoutUpdate}
		selectedTool={"bbox"}
		canvasConfig={this.props.canvasConfig}
		possibleLabels={this.props.listOfPossibleFilters.listOfPossibleLabels}
	//	onSVGUpdate={svg => this.props.siaSetSVG(svg)}
		// onImageLoaded={() => this.handleCanvasImageLoaded()}
	//	onAnnoSelect={anno => this.props.selectAnnotation(anno)}
	//	onImgBarClose={() => this.handleImgBarClose()}
	//	layoutOffset={this.state.layoutOffset}
	/> : "false"
		return (
			
			<div>
				<Row >
					<Col>
						<Card>
							<CardHeader>

								Single Image Annotation - Review ! test
						</CardHeader>
							<CardBody>
								<Row>
									<Col xs="12">
										{ImageSea}

									</Col>
									<Col xs="12">
									<div className={this.state.fullscreenCSS} ref={this.container}>
									{can}
									</div>
									</Col>
								</Row>
							</CardBody>


						</Card>

					</Col>

				</Row>

			</div>
		)
	}
}


function mapStateToProps(state) {
	return ({ 
		listOfPossibleFilters: state.siareview.listOfPossibleFilters,
		listOfAnnos: state.siareview.listOfAnnos,
		svg: state.sia.svg, 
		canvasConfig: state.sia.config,
		uiConfig: state.sia.uiConfig,
		layoutUpdate: state.sia.layoutUpdate,
		selectedTool: state.sia.selectedTool,
		possibleLabels: state.sia.possibleLabels,
		annos: state.sia.annos,

		
	})
}

export default connect(mapStateToProps, { getSiaReviewFilterOptions, getSiaReviewAnnos,getSiaConfig, getSiaImage,siaSetSVG ,siaLayoutUpdate,getSiaLabels, getSiaAnnos})(SiaReview)