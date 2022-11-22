import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Select, Menu, Card, Button, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
//import { Pagination } from 'semantic-ui-react'

export default class ManageJob extends React.Component {
  constructor(props) {
    super(props);
    let loader = loaderData
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");
    //console.log(loader)
    this.state = {
      activePage:0,
      dropdown: '',
      sortDate: '',
      loadJobs: [],
      loaderData: loader,
      
      sortBy: {
        date: "desc"
      },
      filter: {
        showActive: true,
        showClosed: false,
        showDraft: true,
        showExpired: true,
        showUnexpired: true
      },
      totalPages: 1,
      activeIndex: ""
    }
    this.loadData = this.loadData.bind(this);
    this.init = this.init.bind(this);
    this.loadNewData = this.loadNewData.bind(this);
    //your functions go here
  };

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData)
    loaderData.isLoading = false;
    this.setState({ loaderData });//comment this

    //set loaderData.isLoading to false after getting data
    // this.loadData(() =>
    //    this.setState({ loaderData })

    // )
    // loaderData.isLoading = false;

    // console.log(this.state.loaderData)
  }


  


  componentDidMount() {


    this.init();
    this.loadData()

  };

 

  loadData(callback) {
   // var link = `http://localhost:51689/listing/listing/getSortedEmployerJobs?activePage=${this.state.activePage}&showClosed=true&showActive=true&showDraft=true&showExpired=true&showUnexpired=true`;
    var link = 'https://talentproject4.azurewebsites.net/listing/listing/getEmployerJobs';
    var cookies = Cookies.get('talentAuthToken');
    // your ajax call and other logic goes here

    $.ajax({
      url: link,
      headers: {
        'Authorization': 'Bearer ' + cookies,
        'Content-Type': 'application/json'
      },
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (res) {
        console.log(res.myJobs)
        console.log(res)
        if (res.success == true) {
          this.setState((prev) => {
            return {
              
              loadJobs: res.myJobs
            }
          })
        } else {
          TalentUtil.notification.show(res.message, "error", null, null)
        }

      }.bind(this),
      error: function (res, a, b) {
        console.log(res)
        console.log(a)
        console.log(b)
      }
    })
  }

  loadNewData(data) {
    var loader = this.state.loaderData;
    loader.isLoading = true;
    data[loaderData] = loader;
    this.setState(data, () => {
      this.loadData(() => {
        loader.isLoading = false;
        this.setState({
          loadData: loader
        })
      })
    });
  }

  closeJob(id) {
    var link = 'http://localhost:51689/listing/listing/closeJob';
    var cookies = Cookies.get('talentAuthToken');
    // your ajax call and other logic goes here
    $.ajax({
      url: link,
      headers: {
        'Authorization': 'Bearer ' + cookies,
        'Content-Type': 'application/json'
      },
      type: "POST",
      dataType: "json",
      data: JSON.stringify(id),
      success: function (res) {
        console.log(res)
        if (res.success == true) {
          TalentUtil.notification.show(res.message, "success", null, null)
        } else {
          TalentUtil.notification.show(res.message, "error", null, null)
        }

      }.bind(this),
      error: function (res, a, b) {
        console.log(res)
        console.log(a)
        console.log(b)
      }
    })

  }




  render() {

    console.log(this.state.activePage)
    console.log(this.state.loadJobs)

    const options = [
      { key: 1, text: 'Choose filter', value: 5 }

    ]


    const option = [
      { key: 1, text: 'Newest first', value: 5 },

    ]

    const PER_PAGE = 6;
    const offset = this.state.activePage * PER_PAGE;
    const currentPageData = this.state.loadJobs.slice(offset, offset + PER_PAGE);
    const currentPageDat = this.state.loadJobs.slice(0, 0 +6);
    const pageCount = Math.ceil(this.state.loadJobs.length / PER_PAGE);









console.log(this.state.loadJobs.length)
console.log(currentPageData)
console.log(currentPageDat)
console.log(offset)
console.log(this.state.activePage)


    var data = this.state.loadJobs.length>0 ? currentPageData.map((val) => {
      return (
        <Card key={val.id}>
          <Card.Content>

            <Card.Header>{val.title}</Card.Header>
            <Card.Meta>{`${val.location.city}  ${val.location.country}`}</Card.Meta>
            <Card.Description>
              <strong>{val.summary}</strong>
            </Card.Description>
          </Card.Content>
          <Card.Content extra >
            <div className='' style={{ display: "flex" }}>

              <div style={{ marginRight: "auto" }}>

                <button className="mini ui red button">Expired</button>
              </div>

              <div style={{ marginLeft: "auto" }} className="mini ui buttons">
                <button onClick={() => this.closeJob(val.id)} style={{ padding: '0.5rem' }} className=" mini ui  basic blue button">
                  <i className="close icon"></i> Close</button>



                <Link to={`/EditJob/${val.id}`} style={{ padding: '0.5rem' }} className="mini ui  basic blue button">
                  <i className="edit icon"></i>Edit</Link>
                <Link to={`/PostJob/${val.id}`} style={{ padding: '0.5rem' }} className=" mini ui basic blue button">
                  <i className="copy icon"></i>
                  Copy</Link>
              </div>
            </div>
          </Card.Content>



        </Card>
      )
    }) : <strong style={{margin:"2rem"}}>No Data Available</strong>




    return (

      <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
        <div className="ui container"> <h3 style={{marginBottom:"2rem"}}>List of jobs</h3> 

          <div style={{ display: "flex", marginBottom: "1rem", marginTop:"1rem" }} >
            <div style={{display:"flex", alignItems:"center"}}>Filter: &nbsp;
              <div className='dropdown'>
                <Menu compact>
                  <Select onChange={(e, data) => {
                    this.setState({ dropdown: data.value })
                  }} value={this.state.dropdown} options={options} item />
                </Menu>
              </div>

            </div>&nbsp;
            &nbsp;<div style={{display:"flex", alignItems:"center"}}> Sort by date: &nbsp;
              <div className='dropdown'>
                <Menu compact>
                  <Select onChange={(e, data) => {
                    this.setState({ sortDate: data.value })
                  }} value={this.state.sortDate} options={option} item />
                </Menu>
              </div>
            </div>
          </div>
          <Card.Group style={{ marginBottom: "1rem" }}>
            {data}
          </Card.Group>
          <Pagination style={{ marginBottom: "1rem", marginLeft: "50%" }}
            activePage={this.state.activePage}
            onPageChange={(event, pageInfo) => {
              this.setState({ activePage: pageInfo.activePage })
              console.log(this.state.activePage)
              console.log(pageInfo)
            }}
              //totalPages={this.state.activePage+1}
             totalPages={pageCount}
             />
        </div>
      </BodyWrapper>
    )
  }
}