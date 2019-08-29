import React, { Component } from 'react'
import { FormGroup, Badge, Label, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { Input, Icon, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
class ImageSearch extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            tags: [],
            suggestions: [

            ]
        };
        this.PressEnter = this.PressEnter.bind(this)
        this.BadgeonDelete = this.BadgeonDelete.bind(this)
    }
    PressEnter(e) {
        if (e.keyCode == 13) {
            let taglist = this.state.tags
            taglist.push(e.target.value)
            this.setState({ tags: taglist }, () => console.log(this.state.tags))
            e.target.value = ''

        }
    }
    BadgeonDelete(e) {
        let taglist = this.state.tags
        taglist.splice(parseInt(e.target.id), 1)
        this.setState({ tags: taglist })
    }
    render() {
        const badge = this.state.tags.map((name, index) => {
            return <Badge color="info">{name}<Button onClick={this.BadgeonDelete}>x</Button></Badge>
        })

        return (

            <div>
                <CardBody >
                    <Row>
                        <Col xs='12'>
                            <h1>Image/Label Search</h1>
                            Pipeline: {this.props.annoTask.pipelineName}
                        </Col>
                        <Col xs="12">
                            <FormGroup row>
                                <Col sm={{ size: "2", offset: 3 }}>
                                    {badge}
                                </Col>
                            </FormGroup>
                            <Col sm={{ size: "10", offset: 2 }}>
                                <FormGroup row >

                                    <Label sm={1}>Label:</Label>
                                    <Col sm="3">
                                        <Input type="text" name="tags" id="tags" value={this.value} onKeyDown={this.PressEnter}></Input>
                                    </Col>
                                    <Label sm="1">Image Name:</Label>

                                    <Input sm="3" type="text" name="Iname"></Input>
                                    <Col sm={{size:"3",offset:1}}>
                                    <Button icon labelPosition='left'>
                                            Prev
                                        <Icon name='left arrow' />
                                        </Button>
                                        <Button icon labelPosition='right'>
                                            Next
                                        <Icon name='right arrow' />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Col>
                    </Row>
                </CardBody>

            </div>

        )

    }
}

export default ImageSearch