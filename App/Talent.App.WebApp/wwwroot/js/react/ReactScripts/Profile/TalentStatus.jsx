import React from 'react'
//import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Form, Field, Radio, Checkbox } from 'semantic-ui-react'


export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditSection: false,
      jobSeekingStatus: ''
    }

    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)

    this.saveContact = this.saveContact.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)


  }

  openEdit() {
    const status = this.props.status ? this.props.status : {status: ""}

    this.setState({
      showEditSection: true,
      jobSeekingStatus: status.status
    })
  }


  closeEdit() {
    this.setState({
      showEditSection: false
    })
  }


  saveContact() {
    const data = Object.assign({}, { jobSeekingStatus: { status: this.state.jobSeekingStatus } })
    console.log(data)
    this.props.saveProfileData(data)
    this.closeEdit()
  }


  render() {
    console.log(this.props.status)
    return (

      this.state.showEditSection ? this.renderEdit() : this.renderDisplay()

    )


  }

  renderEdit() {
    console.log(this.state.jobSeekingStatus)
    return (
      <Form>
        <Form.Field>
          {/* Selected value: <b>{this.state.jobSeekingStatus}</b> */}
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Actively looking for a job'
            name='checkboxRadioGroup'
            value='Actively looking for a job'
            checked={this.state.jobSeekingStatus === 'Actively looking for a job'}
            onChange={(e, data) => this.setState({ jobSeekingStatus: data.value })}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Not looking for a job at the moment'
            name='checkboxRadioGroup'
            value='Not looking for a job at the moment'
            checked={this.state.jobSeekingStatus === 'Not looking for a job at the moment'}
            onChange={(e, data) => this.setState({ jobSeekingStatus: data.value })}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            radio
            label='Currently employed but open to offers'
            name='checkboxRadioGroup'
            value='Currently employed but open to offers'
            checked={this.state.jobSeekingStatus === 'Currently employed but open to offers'}
            onChange={(e, data) => this.setState({ jobSeekingStatus: data.value })}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            radio
            label='Will be available on later date'
            name='checkboxRadioGroup'
            value='Will be available on later date'
            checked={this.state.jobSeekingStatus === 'Will be available on later date'}
            onChange={(e, data) => this.setState({ jobSeekingStatus: data.value })}
          />
        </Form.Field>
        <div style={{marginBottom:"1rem", display:"flex"}}>
        <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.closeEdit}>Cancel</button>
        <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.saveContact}>Save</button>
        </div>
        

      </Form>
    )
  }

  renderDisplay() {
    var val = this.props.status ? this.props.status : {status: ""}
    //var val = this.state.jobSeekingStatus
    console.log(val)
    return (
      <Form>
        <Form.Field>

        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Actively looking for a job'
            name='checkboxRadioGroup'
            value='Actively looking for a job'
            checked={val.status === 'Actively looking for a job'}

          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Not looking for a job at the moment'
            name='checkboxRadioGroup'
            value='Not looking for a job at the moment'
            checked={val.status === 'Not looking for a job at the moment'}

          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            radio
            label='Currently employed but open to offers'
            name='checkboxRadioGroup'
            value='Currently employed but open to offers'
            checked={val.status === 'Currently employed but open to offers'}
            onChange={(e, data) => this.setState({ jobSeekingStatus: data.value })}
          />
        </Form.Field>

        <Form.Field>
          <Checkbox
            radio
            label='Will be available on later date'
            name='checkboxRadioGroup'
            value='Will be available on later date'
            checked={val.status === 'Will be available on later date'}
            onChange={(e, data) => this.setState({ jobSeekingStatus: data.value })}
          />
        </Form.Field>
        <div style={{ marginBottom: "1rem" , display:"flex"}} >
        <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>

        </div>
       
      </Form>
    )
  }
}