import React, { Component } from 'react'
import { FormGroup, Badge, Label, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { Input, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import actions from '../../actions'
import 'semantic-ui-css/semantic.min.css';
import Autocomplete from "react-autocomplete"
import LabelInput from './LabelInput'
import UserInput from './UserInput'
const { getSiaReviewFilterOptions } = actions
class ImageSearch extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            tags: [],
            suggestions: this.props.filter.listOfPossibleLabels,
            suggestionsUnames:this.props.filter.listOfALLUserInTask,
            IdtoLabel: null,
            Usernames: [],
            IdtoUsername:null
            
        };
        
        this.PressEnter = this.PressEnter.bind(this)
        this.BadgeonDelete = this.BadgeonDelete.bind(this)
        this.CallbackBadgesLabels = this.CallbackBadgesLabels.bind(this)
        this.CallbackBadgesUnames = this.CallbackBadgesUnames.bind(this)
        this.BadgeonDeleteUname = this.BadgeonDeleteUname.bind(this)
      
        console.log(this.state.tagnamelist)
    }
    componentDidMount() {
        this.props.getSiaReviewFilterOptions()
        let idtolabel = new Map()
        let idtoUname = new Map()
       console.log("HALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",this.props)
        
        this.state.suggestions.forEach((data) =>
        {
            console.log("_______________________________________hallooooooooooooooooooo",data)
            
            if(!idtolabel.get(data.id))
            {
            idtolabel.set(data.id,data.label)
            }
            
        })
    
        this.setState({IdtoLabel:idtolabel})
          
        this.state.suggestionsUnames.forEach((data)=>
        {
            if(!idtoUname.get(data.id))
            {
                idtoUname.set(data.id,data.label)
            }
        })
    
        this.setState({IdtoUsername:idtoUname})
    
    }
   
    PressEnter(e) {
        if (e.keyCode == 13) {
            let taglist = this.state.tags
            taglist.push(e.target.value)
            this.setState({ tags: taglist }, () => console.log(this.state.tags))
            e.target.value = ''

        }
    }
    CallbackBadgesLabels = (childdata)=>
    {
     let taglist = childdata
     this.setState({tags:taglist})
    }
    CallbackBadgesUnames = (childdata) =>
    {
        let uNamelist = childdata
        this.setState({Usernames:uNamelist})
    }
    BadgeonDeleteUname(e)
    {
        let userlist = this.state.Usernames
        userlist.splice(parseInt(e.target.id),1)
        this.setState({Usernames:userlist})
    }
    BadgeonDelete(e) {
        let taglist = this.state.tags
        taglist.splice(parseInt(e.target.id), 1)
        this.setState({ tags: taglist })
    }
    nextImage = ()=>
    {
        console.log("testetst")
        this.props.parentCallback()
    }
    prevImage = ()=>
    {
        this.props.prevImage()
    }
    render() {
        const badge = this.state.tags.map((name, index) => {
            return <Badge color="info">{this.state.IdtoLabel.get(name)}<Button onClick={this.BadgeonDelete}>x</Button></Badge>
        })
        const badgeUser = this.state.Usernames.map((name,index)=>
        {
            return <Badge color="info">{this.state.IdtoUsername.get(name)}<Button onClick={this.BadgeonDeleteUname}>x</Button></Badge>
        })
        console.log(this.state)
        console.log(this.props)
        let items = this.props.listOfPossibleFilters.listOfPossibleLabels
        console.log(items)
        return (

            <div>
                <CardBody >
                    <Row>
                        <Col xs='12'>
                            <h1>Image/Label Search</h1>
                            Pipeline: {this.props.annoId}
                        </Col>
                        <Col xs="12">
                            <FormGroup row>
                                <Col sm={{ size: "2", offset: 2 }}>
                                    {badge}
                                </Col>
                                <Col sm="2">
                                {badgeUser}
                                </Col>
                            </FormGroup>
                            <Col sm={{ size: "11", offset: 1 }}>
                                <FormGroup row >

                                    <Label sm={1}>Label:</Label>
                                    <Col sm="2">
                                        <LabelInput
                                             multilabels={true}
                                          //  multilabels={this.props.multilabels}
                                           // relatedId={this.props.annos.image.id}
                                            visible={true}
                                            //onLabelUpdate={label => this.handleLabelUpdate(label)}
                                            possibleLabels={this.props.listOfPossibleFilters.listOfPossibleLabels?this.props.listOfPossibleFilters.listOfPossibleLabels:[]}
                                            parentcallback={this.CallbackBadgesLabels}
                                            //initLabelIds={this.props.imgLabelIds}
                                         //   relatedId={this.props.annos.image.id}
                                        />
                                    </Col>
                                    <Label sm="1">UserName</Label>
                                    <Col sm="2">
                                        <UserInput
                                             multilabels={true}
                                          //  multilabels={this.props.multilabels}
                                           // relatedId={this.props.annos.image.id}
                                            visible={true}
                                            //onLabelUpdate={label => this.handleLabelUpdate(label)}
                                            possibleLabels={this.props.listOfPossibleFilters.listOfALLUserInTask?this.props.listOfPossibleFilters.listOfALLUserInTask:[]}
                                            parentcallback={this.CallbackBadgesUnames}
                                            //initLabelIds={this.props.imgLabelIds}
                                         //   relatedId={this.props.annos.image.id}
                                        />
                                    </Col>
                                    <Label sm="1">Image Name:</Label>

                                    <Input sm="2" type="text" name="Iname"></Input>
                                    <Col sm={{ size: "2" }}>
                                        <Button icon labelPosition='left' onClick={this.prevImage}>
                                            Prev
                                        <Icon name='left arrow' />
                                        </Button>
                                        <Button icon labelPosition='right' onClick={this.nextImage}>
                                            Next
                                        <Icon name='right arrow' />
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col sm={{size:"3",offset:5}}>
                            <Button>Search</Button>
                            </Col>
                        </Col>
                    </Row>
                </CardBody>

            </div>

        )

    }
}
function mapStateToProps(state) {
    return ({ listOfPossibleFilters: state.siareview.listOfPossibleFilters })
}
export default connect(mapStateToProps, { getSiaReviewFilterOptions })(ImageSearch)