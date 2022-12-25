/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table } from 'semantic-ui-react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button } from 'semantic-ui-react'


import { Icon } from 'semantic-ui-react'

export default class Skill extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            showEditSection: false,
            newContact: {
                Id: '',
                name: "",
                level: '',
                currentUserId: ''



            },
            language: ''
        }

        this.openEdit = this.openEdit.bind(this)
        this.updateLanguage = this.updateLanguage.bind(this)
        this.openAdd = this.openAdd.bind(this)
        this.addLanguage = this.addLanguage.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

      
    };

  
    openEdit(x) {
        const details = Object.assign({}, x)
        this.setState({
            showEditSection: true,
            newContact: details
        })


    }


    openAdd() {
        this.setState({
            showAddSection: true
        })
    }

    closeAdd() {
        this.setState({
            showAddSection: false
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }


    deleteLanguage(data) {
        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'https://talentproject3.azurewebsites.net/profile/profile/deleteSkill',
            //url: 'http://localhost:60290/profile/profile/deleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',


            },
            type: "POST",


            dataType: "json",
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill deleted sucessfully", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not delete successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }


    updateLanguage() {
        var cookies = Cookies.get('talentAuthToken');
        // const data = Object.assign({}, this.state.newContact)



        $.ajax({
            url: 'https://talentproject3.azurewebsites.net/profile/profile/updateSkill',
          //  url: 'http://localhost:60290/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json',


            },
            type: "POST",


            dataType: "json",
            data: JSON.stringify(this.state.newContact),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    this.props.loadData()
                    this.closeEdit()
                } else {
                    TalentUtil.notification.show("Skill did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
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

        const data = Object.assign({}, this.state.newContact)
        this.props.saveProfileData(data)
        this.closeEdit()
    }





    addLanguage() {
        var cookies = Cookies.get('talentAuthToken');
        let { name, level } = this.state.newContact

        if (!name || !level) {
            TalentUtil.notification.show("Please provide all fields", "error", null, null)
        }

        else {

            $.ajax({
                url: 'https://talentproject3.azurewebsites.net/profile/profile/addSkill',
               // url: 'http://localhost:60290/profile/profile/addSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json',


                },
                type: "POST",


                dataType: "json",
                data: JSON.stringify(this.state.newContact),
                success: function (res) {
                    console.log(res)
                    if (res.success == true) {
                        TalentUtil.notification.show("Skill added sucessfully", "success", null, null)
                        this.props.loadData()
                        this.closeAdd()
                    } else {
                        TalentUtil.notification.show("Skill did not add successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {
                    console.log(res)
                    console.log(a)
                    console.log(b)
                }
            })

        }








    }



    render() {

        console.log(this.state.newContact)


        return (


            this.state.showAddSection ? this.renderAdd() : this.renderDisplay()


        )
    }




    renderEdit() {

        let _LOptions = [];

        let languageOption = ["Beginner", "Intermediate", "Expert"]
        const index = languageOption.indexOf(this.state.newContact.level);

        languageOption.splice(index, 1);

        // let selectedLanguage = data.name

        _LOptions = languageOption.map((x) => <option key={x} value={x}>{x}</option>);



        return (

            <React.Fragment>
                <Table.Row >
                    <Table.Cell>                        <input
                        type="text"
                        name="name"
                        value={this.state.newContact.name}
                        placeholder="Enter your language"
                        maxLength={this.props.maxLength}
                        onChange={this.handleChange}
                    /></Table.Cell>
                    <Table.Cell>                        <select className="ui right labeled dropdown"
                        placeholder="Language level"
                        value={this.state.newContact.level}
                        onChange={this.handleChange}
                        name="level">

                        <option value="">{this.state.newContact.level}</option>
                        {_LOptions}
                    </select></Table.Cell>
                    <Table.Cell>
                        
                        <button type='button' className=' ui primary basic button'  onClick={this.updateLanguage}>
                        Update
                        </button>

                        <button type='button' className=' ui negative basic button' onClick={this.closeEdit}>
                            Cancel
                        </button>
                        
                    </Table.Cell>

                </Table.Row>

               


            </React.Fragment >
        )


    }


    renderAdd() {

        let _LOptions = [];
        let languageOption = ["Beginner", "Intermediate", "Expert"]

       

        _LOptions = languageOption.map((x) => <option key={x} value={x}>{x}</option>);



        return (

            <React.Fragment>





                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                }} className='ui sixteen wide column '>







                    <div style={{ margin: "0px", flexGrow: "1", marginRight: "1rem" }} className="field">

                        <input
                            type="text"
                            name="name"
                            value={this.state.newContact.name}
                            placeholder="Enter your skill"

                            onChange={this.handleChange}
                        />
                        {this.props.isError ? <div className="ui basic red pointing prompt label transition visible">Please enter a valid language</div> : null}
                    </div>


                    <div style={{ margin: "0px", flexGrow: "1", marginRight: "1rem" }}>


                        <select className="ui right labeled dropdown"
                            placeholder="Skill level"
                            value={this.state.newContact.level}
                            onChange={this.handleChange}
                            name="level">

                            <option value="">Skill level</option>
                            {_LOptions}
                        </select>









                    </div>

                    <div>

                        <button type="button" className="ui teal button" onClick={this.addLanguage} >Add</button>
                        <button type="button" className="ui teal button" onClick={this.closeAdd} >Cancel</button>
                    </div>





                </div>

                {this.renderDisplay()}


            </React.Fragment>
        )


    }








    renderDisplay() {


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>


                        <Table singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Skill</Table.HeaderCell>
                                    <Table.HeaderCell>Level</Table.HeaderCell>
                                    <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.openAdd}>Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>



                                {this.state.showEditSection && this.renderEdit()}





                                {
                                    this.props.skillData.map((x) => {
                                        return (
                                            <Table.Row key={x.id}>
                                                <Table.Cell>{x.name}</Table.Cell>
                                                <Table.Cell>{x.level}</Table.Cell>
                                                <Table.Cell>

                                                    
                                                    <button type="button" className="ui right floated basic button" onClick={() => { this.deleteLanguage(x) }} ><Icon name='delete'  /></button>
                                                    <button type="button" className="ui right floated  basic button" onClick={() => { this.openEdit(x) }} ><Icon name='edit'  /></button>
                                                </Table.Cell>

                                            </Table.Row>

                                        )
                                    })
                                }


                            </Table.Body>
                        </Table>

                    </React.Fragment>

                </div>
            </div>
        )
    }

}

