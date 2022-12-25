import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Pagination, Icon, Dropdown, Select, Menu, Card, Button, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import TalentDetail from './TalentDetail.jsx';
export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 0,
            feedData: [],
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
      //  this.loadEmployer = this.employerData.bind(this);

    };

    // init() {
    //     let loader = TalentUtil.deepCopy(this.state.loaderData)
    //     loader.isLoading = false


    // }

    init() {
        let loaderData = this.state.loaderData;

        loaderData.isLoading = false;

    }


    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",

            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                this.setState({
                   
                    feedData:res.data,
                    
                })
                // this.updateWithoutSave(res.data)
                console.log(res.data)
            }.bind(this)
        })
        this.init()
    }

    loadEmployer() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentproject3.azurewebsites.net/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let employerData = null;
                if (res.employer) {
                    employerData = res.employer
                    // this.setState(
                    //     {
                    //         feedData:this.state.feedData,
                       
                    //         companyDetails:res.employer,
                           
                    //     })
                        
                    console.log("employerData", employerData)
                    
                    

                }
                this.updateWithoutSave(employerData)
            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        }) 
       // this.init()
    }


    updateWithoutSave(newData) {
        let newSD = Object.assign({}, this.state.employerData, newData)
        this.setState({
            feedData:this.state.feedData,
            companyDetails: newSD
        })
    }

   

    componentDidMount() {
        this.loadData()
        this.loadEmployer()
       
        // window.addEventListener('scroll', this.handleScroll);
        // this.init()
    };


    render() {
       
        
        console.log(this.state.feedData)
        console.log(this.state)

        
        

        return (

            <BodyWrapper loaderData={this.state.loaderData} reload={this.loadData}

            >


                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">

                                        <div className='row'>


                                            <div className='ui five wide column'>
                                                <CompanyProfile companyDetails={this.state.companyDetails} />
                                                
                                            </div>

                                            <div className='ui six wide column'>
                                                <TalentCard data={this.state.feedData} />
                                                
                                            </div>

                                            <div className='ui five wide column'>
                                                <TalentDetail/>
                                            </div>



                                        </div>





                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>

            </BodyWrapper>
        )
    }
}