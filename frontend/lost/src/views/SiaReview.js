import React, { Component } from "react"
import { 
    CardHeader,
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap'
import {connect} from 'react-redux'
import actions from '../actions'
import ImageSearch from '../components/SIAReview/ImageSearch'
import SIAReviewCanvas from '../components/SIAReview/SIAReviewCanvas'
const { getWorkingOnAnnoTask,getAnnoTasks,getSiaReviewFilterOptions} = actions



class SiaReview extends Component {
	constructor(props){
		super(props)
		console.log(this.props.history)
		console.log(this.state)
	}
	componentDidMount()
	{
		this.props.getWorkingOnAnnoTask()
		this.props.getSiaReviewFilterOptions()
	}


	render(){
		//                                                           GetWorkingReviewTask || Oder TaskID in URL
		//																										     StartSIAwith
		

		// GET_SIA_ANNOS_FROMANNOTASKID  ==> Canvas Ausgeben restlichen SIA Funktionen nutzen wie sie sind?
		// 
		//
		// 
		console.log(this.state)
		const ImageS = this.props.workingOnAnnoTask?<ImageSearch annoTask={this.props.workingOnAnnoTask}></ImageSearch>:null;
		console.log(this.props.getSiaReviewFilterOptions)
		//const can = this.props.history.location.state.annoTask? <SIAReviewCanvas annoTask={this.props.history.location.state.annoTask}></SIAReviewCanvas>:null;
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
								{ImageS}
							 
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
    return ({ workingOnAnnoTask: state.annoTask.workingOnAnnoTask, annoTasks: state.annoTask.annoTasks,listOfPossibleFilters: state.siareview.listOfPossibleFilters})
}

export default connect(mapStateToProps, {getWorkingOnAnnoTask,getAnnoTasks,getSiaReviewFilterOptions})(SiaReview)