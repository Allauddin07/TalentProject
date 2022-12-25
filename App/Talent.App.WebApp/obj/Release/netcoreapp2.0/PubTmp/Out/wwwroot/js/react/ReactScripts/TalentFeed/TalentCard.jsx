import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon, Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
export default class TalentCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddSection: false
    }
    this.renderdisplay = this.renderdisplay.bind(this)
    this.rendervideo = this.rendervideo.bind(this)
    this.openProfile = this.openProfile.bind(this)

  };

  openProfile() {
    this.setState({ showAddSection: !this.state.showAddSection })
  }



  render() {

    console.log(this.props.data)
    return (

      <React.Fragment>
        <Card.Group style={{
          width: "400px",
          height: "370px",
          overflow: "scroll"
        }}>

          {





            this.props.data.map((x, index) => {

              return(


                  <Card style={{ width: "400px" }} key={x[0].id}  >
                    <Card.Content>

                      <Card.Header style={{ marginBottom: "2.5rem" }}>
                        <span className='left floated'>{x[0].name}</span> <span className='right floated'><i className="star icon"></i></span>
                      </Card.Header>

                      <Card.Description>

                        {this.state.showAddSection ? 
                        this.renderdisplay(x[0].name, x[0].visa,
                           x[0].currentEmployment, x[0].label, x[0].photoId)
                         : this.rendervideo()}


                      </Card.Description>
                      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "0.5rem" }}>
                        <span className="">

                          {this.state.showAddSection ? <i className="video icon" onClick={this.openProfile}></i>

                            : <i className="user icon" onClick={this.openProfile}></i>

                          }




                        </span>
                        <span className="">
                          <i class="file pdf outline icon"></i>

                        </span>
                        <span className="">

                          <i className="linkedin icon"></i>

                        </span>
                        <span className="">
                          <i className="github icon"></i>
                        </span>
                      </div>





                    </Card.Content>
                    <Card.Content extra >

                      <div class="ui large transparent left icon input">
                        <button className='mini ui  basic blue button'>{ x[0].skills[0]}</button>
                      </div>
                    </Card.Content>



                  </Card>
              
                           )
            })
          }


</Card.Group>
        
      </React.Fragment >
    )
  }

  renderdisplay(name, visa, currentEmployment, level, photo) {
    return (
      <React.Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flexGrow: "1" }}>

            <img style={{ height: "200px" }}
             src={photo ? photo: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' } alt="" />


          </div>

          <div style={{ flexGrow: "1" }}>

            <Card.Description >

              <div style={{ marginBottom: "1rem" }}><strong >{name} </strong></div>

              <div style={{ marginBottom: "1rem" }}>
                <p style={{ margin: "0rem" }} >Current Employer </p>
                <p style={{ margin: "0rem" }} >{currentEmployment} </p>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <p style={{ margin: "0rem" }}>Visa Status</p>
                <p style={{ margin: "0rem" }}>{visa}</p>
              </div>

              <div>
                <p style={{ margin: "0rem" }}>Position</p>
                <p style={{ margin: "0rem" }}>{level}</p>
              </div>
            </Card.Description>
          </div>
        </div>



























      </React.Fragment>
    )
  }

  rendervideo() {
    return (
      <video style={{ width: "-webkit-fill-available" }} controls>
        <source src="mov_bbb.mp4" type="video/mp4" />
        <source src="mov_bbb.ogg" type="video/ogg" />
        Your browser does not support HTML video.
      </video>
    )
  }
}

