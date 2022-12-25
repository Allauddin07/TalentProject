import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx'
import TalentCardDetail from '../TalentFeed/TalentCardDetail.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { Card, Feed, Button } from 'semantic-ui-react'


export default class TalentDetail extends React.Component {

    constructor(props) {
        super(props)
    }

    //componentDidMount() {
    //    this.loadData()
    //}

    //loadData()  url: 'http://localhost:60290/profile/profile/getTalentProfile',

    render() {
        return (
            <Card style={{width:"auto"}}>
                {/* <Card.Content>
                    <Card.Header>Follow Talent</Card.Header>
                </Card.Content> */}
                <Card.Content>
                <Card.Header style={{textAlign:"center"}}>Follow Talent</Card.Header>
                    <Feed>
                        <Feed.Event  >
                            <div style={{marginLleft:"1rem"}}></div>
                            <Feed.Label image='/images/avatar/small/jenny.jpg'  />
                            <Feed.Content style={{
                                marginTop: "0.1em",
                                marginRight: "0em",
                                marginBottom: "0.357143em",
                                marginLleft: "1.14286em"
                            }}>

                                <Feed.Label>Azam</Feed.Label>
                                <button className=" mini ui  basic blue button">
                                    <i className="user icon"></i> Follow</button>


                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label image='/images/avatar/small/molly.png' />
                            <Feed.Content style={{
                                marginTop: "0.1em",
                                marginRight: "0em",
                                marginBottom: "0.357143em",
                                marginLleft: "1.14286em"
                            }}>

                                <Feed.Label>Azad</Feed.Label>

                                <button className=" mini ui  basic blue button">
                                    <i className="user icon"></i> Follow</button>
                            </Feed.Content>
                        </Feed.Event>

                        <Feed.Event>
                            <Feed.Label image='/images/avatar/small/elliot.jpg' />
                            <Feed.Content style={{
                                marginTop: "0.1em",
                                marginRight: "0em",
                                marginBottom: "0.357143em",
                                marginLleft: "1.14286em"
                            }}>

                                <Feed.Label>Kausar</Feed.Label>

                                <button className=" mini ui  basic blue button">
                                    <i className="user icon"></i> Follow</button>
                            </Feed.Content>
                        </Feed.Event>
                    </Feed>
                </Card.Content>
            </Card>
        )
    }
}