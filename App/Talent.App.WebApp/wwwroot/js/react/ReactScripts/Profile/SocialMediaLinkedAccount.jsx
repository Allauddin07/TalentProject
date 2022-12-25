/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const details = props.linkedAccounts ?
        Object.assign({}, props.linkedAccounts)
        : {
            linkedIn: "",
            
            github: ""
        
        }

        

    this.state = {
        showEditSection: false,
        newContact: details
    }

    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveContact = this.saveContact.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)


    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {
        const details = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            newContact: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newContact)
        data[event.target.name] = event.target.value
        this.setState({
            newContact: data
        })
    }

    saveContact() {
        //console.log(this.props.componentId)
        console.log(this.state.newContact)
        console.log(this.props.linkedAccounts)
        const data = Object.assign({}, this.state.newContact)
        this.props.saveProfileData({linkedAccounts:data})
        this.closeEdit()
    }

    render() {

        console.log(this.state.newContact)
       
        console.log(this.props.linkedAccounts)

        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()

        )

    }


    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    label="LinkedIn"
                    name="linkedIn"
                    value={this.state.newContact.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your linkedIn Url"
                    errorMessage="Please enter a valid Url"
                />
                <ChildSingleInput
                    inputType="text"
                    label="GitHub"
                    name="github"
                    value={this.state.newContact.github}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your gitHub Url"
                    errorMessage="Please enter a valid Url"
                />
           
                <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                <button type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button>
               
            </div>
        )
    }

    renderDisplay() {

       
console.log(this.props.linkedAccounts)
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>

                    <a href={this.props.linkedAccounts.linkedIn} type="button" className="ui teal button" >LinkedIn</a>
                    <a href={this.props.linkedAccounts.github} type="button" className="ui teal button" >GitHub</a>
                      
                      
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}