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
import Canvas from '../components/SIA/Canvas'
const { getWorkingOnAnnoTask } = actions



class SiaReview extends Component {
	constructor(props){
		super(props)
		console.log(this.props)
		console.log(this.state)
	}
	componentDidMount()
	{
		this.props.getWorkingOnAnnoTask()
	}


	render(){
		console.log(this.state)
		const ImageS = this.props.workingOnAnnoTask?<ImageSearch annoTask={this.props.workingOnAnnoTask}></ImageSearch>:null;
		return (
			<div>
			<Row >
				<Col>
					<Card>
						<CardHeader>
							Single Image Annotation - Review !
						</CardHeader>
						{ImageS}
							
						
					</Card>
				</Col>
			</Row>
			
			</div>
		)
	}
}

function mapStateToProps(state) {
    return ({ workingOnAnnoTask: state.annoTask.workingOnAnnoTask})
}

export default connect(mapStateToProps, {getWorkingOnAnnoTask})(SiaReview)