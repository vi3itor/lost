import React, {Component} from 'react'
import {Progress} from 'reactstrap'
import {getColor} from './utils'
import {Button, Col ,Row} from 'reactstrap'

import { createHashHistory } from 'history'
const history = createHashHistory()

class WorkingOn extends Component {
    handleContinue(type){
        history.push(`/${type.toLowerCase()}`)
    }
    render() {
        let progress = Math.floor((this.props.annoTask.finished / this.props.annoTask.size) * 100)
        return (
            <div>
                <Row>
                <Col xs='3' md='3' xl='3'>
                <div className='callout callout-danger'>
                                <small className='text-muted'>Working on</small>
                                <br/>
                                <strong>{this.props.annoTask.name}</strong>
                 </div>
                </Col>
                <Col xs='3' md='3' xl='3'>
                  <div className='callout callout-info'>
                                <small className='text-muted'>Pipeline</small>
                                <br/>
                                <strong>{this.props.annoTask.pipelineName}</strong>
                 </div>
                </Col>
                <Col xs='3' md='3' xl='3'>
                  <div className='callout callout-warning'>
                                <small className='text-muted'>Annotations</small>
                                <br/>
                                <strong className='h4'>{this.props.annoTask.finished}/{this.props.annoTask.size}</strong>
                 </div>
                </Col>
                </Row>
                <div className='clearfix'>
                    <div className='float-left'>
                        <strong>{progress}%</strong>
                    </div>
                    <div className='float-right'>
                        <small className='text-muted'>Started at: {this.props.annoTask.createdAt}</small>
                    </div>
                </div>
                <Progress className='progress-xs' color={getColor(progress)} value={progress}/>
                <br/>
                <br/>
                <Button onClick={()=>this.handleContinue(this.props.annoTask.type) }className='btn btn-info'>Continue</Button>
            </div>
        )
    }
}

export default WorkingOn