import React from 'react';
import Cookies from 'js-cookie'

//import {  loaderData } from '../Layout/BodyWrapper.jsx';

import { Card, Image } from 'semantic-ui-react'


export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        const employe = props.companyDetails ?
            Object.assign({}, props.companyDetails)
            : {

            }

        // let loader = loaderData
        // loader.allowedUsers.push("Employer")
        // loader.allowedUsers.push("Recruiter")

        this.state = {
            // loaderData: loader,
            //  loadingFeedData: false,
            companyDetails: null
        }

        //this.init = this.init.bind(this);
    }

    // init() {
    //     let loaderData = this.state.loaderData;

    //     loaderData.isLoading = false;

    // }

    // componentDidMount() {

    //     this.loadEmployer()

    // };




    // loadEmployer() {
    //     var cookies = Cookies.get('talentAuthToken');
    //     $.ajax({
    //         url: 'https://talentproject3.azurewebsites.net/profile/profile/getEmployerProfile',
    //         headers: {
    //             'Authorization': 'Bearer ' + cookies,
    //             'Content-Type': 'application/json'
    //         },
    //         type: "GET",
    //         contentType: "application/json",
    //         dataType: "json",
    //         success: function (res) {
    //             let employerData = null;
    //             if (res.employer) {
    //                 employerData = res.employer
    //                 this.setState(
    //                     {

    //                         companyDetails:res.employer,

    //                     })

    //                 console.log("employerData", employerData)



    //             }
    //             //this.updateWithoutSave(employerData)
    //         }.bind(this),
    //         error: function (res) {
    //             console.log(res.status)
    //         }
    //     }) 
    //    // this.init()
    // }




    render() {

        let emp = Object.assign({}, this.props.companyDetails)

        let em = Object.assign({}, emp)
        let emData = Object.assign({}, em.companyContact)
        let location = Object.assign({}, emData.location)





        // console.log(this.props.companyDetails.id)
        //let emp = this.props.companyDetails

        return (
            <Card style={{ width: "auto" }}>
                <Card.Content>
                    <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                        <Image style={{ width: "60px", borderRadius: "3rem" }}

                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                        />
                    </div>


                    <Card.Header style={{ textAlign: "center" }}>{emData.name}</Card.Header>
                    <Card.Meta style={{ textAlign: "center" }}>
                        {`${location.country} ${location.city}`}
                    </Card.Meta>
                    <Card.Description style={{ textAlign: "center" }}>
                        <strong >We currently do not have specific skill that we desire </strong>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra >
                    <div className='' style={{}}>



                        <div style={{ marginRight: "auto" }}>

                            <span><i className="phone icon"></i>: </span> <span>{emData.phone}</span>
                        </div>
                        <div style={{ marginRight: "auto" }}>

                            <span><i className="envelope outline icon"></i></span>: <span>{emData.email}</span>
                        </div>


                    </div>
                </Card.Content>



            </Card>
        )
    }
}