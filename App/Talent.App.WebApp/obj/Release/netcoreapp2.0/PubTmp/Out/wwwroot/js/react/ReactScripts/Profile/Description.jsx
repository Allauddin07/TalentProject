import React from 'react';
import Cookies from 'js-cookie';
//import {SelfIntroduction} from './SelfIntroduction';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
export class Description extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            bio: {
                summary: '',
                description: '',
            },
            characters: 0
        };
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.update = this.update.bind(this);
    };

    openEdit() {
        var data = { summary: this.props.summary, description: this.props.description }
        const details = Object.assign({}, data)
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
      
        const data = Object.assign({}, this.state.bio)
        data[event.target.name] = event.target.value
        this.setState({
            bio:data
        })
    }

    saveContact() {
        var val = { summary: this.state.bio.summary, description: this.state.bio.description }
        const data = Object.assign({}, val)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    update(event) {
        //  let data = {};
        //s data[event.target.name] = event.target.value;
        // this.props.saveProfileData(data);
        let description = event.target.value;
        let introduction = event.target.value;
        this.setState({
            characters: description.length
        })
    }

    render() {

        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )


    }


    renderEdit() {
        console.log(this.state.bio)
        //console.log(this.state.summary)
        const characterLimit = 600;
        let characters = this.props.description ? this.props.description.length : 0;

        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>

                <div className="ten wide column">
                    <div className='field'>
                        <ChildSingleInput
                            inputType="text"

                            name="summary"
                            value={this.state.summary}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Pleae provide a short summary about your self"
                            errorMessage="Please enter a valid summary"
                        />
                    </div>
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.state.description} onChange={this.handleChange} ></textarea>
                    </div>
                    <p>Characters remaining : {characters} / {characterLimit}</p>
                    <button type="button" className="ui right floated teal button" onClick={this.saveContact} >Save</button>
                    <button type="button" className="ui right floated teal button" onClick={this.closeEdit} >Cancel</button>
                </div>
            </React.Fragment>
        )
    }

    renderDisplay() {

        const characterLimit = 600;
        const summaryLimit = 150;
        let characters = this.props.description ? this.props.description.length : 0;
        let summaryCh = this.props.summary ? this.props.summary.length : 0;
        return (
            <React.Fragment>
                <div className="four wide column">
                    <h3>Description</h3>
                    <div className="tooltip">Write a description of your company.</div>
                </div>

                <div className="ten wide column">
                    <div className='field'>
                        <ChildSingleInput
                            inputType="text"

                            name="introduction"
                            value={this.props.summary}
                            controlFunc={this.update}
                            maxLength={80}
                            placeholder="Pleae provide a short summary about your self"
                            errorMessage="Please enter a valid summary"
                        />
                        <strong>Characters remaining : {summaryCh} / {summaryLimit}</strong>
                    </div>
                    <div className="field" >
                        <textarea maxLength={characterLimit} name="Description" placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add." value={this.props.description} onChange={this.update} ></textarea>
                    </div>
                    <strong>Characters remaining : {characters} / {characterLimit}</strong>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit} >Edit</button>
                </div>
            </React.Fragment>
        )
    }
}
