/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table } from 'semantic-ui-react'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Button } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import moment from 'moment/moment.js';
import { Form, Field, Radio, Checkbox } from 'semantic-ui-react'
//import "react-datepicker/dist/react-datepicker.css";

export default class Experience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddSection: false,
            showEditSection: false,
            startD: "",
            endD: '',
            newContact: {
                Id: '',
                company: "",
                position: '',
                responsibilities: '',
                start: '',
                end: ''



            },

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
        this.dateformate = this.dateformate.bind(this)

    };

    openEdit(x) {
        const details = Object.assign({}, x)
        this.setState({
            showEditSection: true,
            newContact: details,
            startD: details.start,
            endD: details.end
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
            url: 'https://talentproject3.azurewebsites.net/profile/profile/deleteExperience',
          //  url: 'http://localhost:60290/profile/profile/deleteExperience',
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
                    TalentUtil.notification.show("deleted sucessfully", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("did not delete successfully", "error", null, null)
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
        const data = Object.assign({}, this.state.newContact, {
            start: this.state.startD, end: this.state.endD
        })

        console.log(data)



        $.ajax({
            url: 'https://talentproject3.azurewebsites.net/profile/profile/updateExperience',
            //url: 'http://localhost:60290/profile/profile/updateExperience',
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
                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    this.props.loadData()
                    this.closeEdit()
                } else {
                    TalentUtil.notification.show("Experirence did not update successfully", "error", null, null)
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
        
        let { company, position, responsibilities, start } = this.state.newContact

        if (!company || !position || !responsibilities || !start) {
            TalentUtil.notification.show("Please provide all fields", "error", null, null)
        }

        else {

            $.ajax({
                url: 'https://talentproject3.azurewebsites.net/profile/profile/addExperience',
                //url: 'http://localhost:60290/profile/profile/addExperience',
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
                        TalentUtil.notification.show("added sucessfully", "success", null, null)
                        this.props.loadData()
                        this.closeAdd()
                    } else {
                        TalentUtil.notification.show("did not add successfully", "error", null, null)
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


        var startD = this.dateformate(new Date(this.state.startD), "edit")
        var endD = this.dateformate(new Date(this.state.endD), "edit")








        return (
            <React.Fragment>

                <Table.Row>




                    <Table.Cell colSpan='3' style={{ borderTop: "none" }}><ChildSingleInput
                        inputType="text"
                        label="Company"
                        name="company"
                        value={this.state.newContact.company}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your company name"
                        errorMessage="Please enter a valid name"
                    /></Table.Cell>
                    <Table.Cell colSpan='2' style={{ borderTop: "none" }}> <ChildSingleInput
                        inputType="text"
                        label="Position"
                        name="position"
                        value={this.state.newContact.position}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your position"
                        errorMessage="Please enter a valid position"
                    /></Table.Cell>





                </Table.Row>


                <Table.Row>


                    <Table.Cell colSpan='2' style={{ borderTop: "none" }}>
                        <div style={{ marginBottom: "0.3rem" }}><label htmlFor="">Start</label></div>






                        <DatePicker style={{ display: "none" }} name="startD" placeholder="please enter start date"
                            value={startD}
                            onChange={(date) => this.setState({ startD: moment(date).format() })}
                        />

                    </Table.Cell>
                    <Table.Cell colSpan='3' style={{ borderTop: "none" }}>
                        <div style={{ marginBottom: "0.3rem" }}><label htmlFor="">End</label></div>

                        <DatePicker format="dd/MM/yyyy" name="endD" value={endD} placeholder="please enter start date"
                            onChange={(date) => this.setState({ endD: moment(date).format() })}

                        />


                    </Table.Cell>
                </Table.Row>
                <Table.Row>

                    <Table.Cell colSpan='5' style={{ borderTop: "none" }}>
                        <ChildSingleInput
                            inputType="text"
                            label="Responsiilities"
                            name="responsibilities"
                            value={this.state.newContact.responsibilities}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your responsibility"
                            errorMessage="Please enter a valid suburb"
                        />
                    </Table.Cell>


                </Table.Row>

                <Table.Row>
                    <Table.Cell style={{ borderTop: "none" }}>
                        <button style={{ marginTop: "1rem" }} type="button" className="ui teal button" onClick={this.updateLanguage} >Save</button>
                        <button style={{ marginTop: "1rem" }} type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button>
                    </Table.Cell>


                </Table.Row>



                {/* {this.renderDisplay()} */}
            </React.Fragment>
        )

    }


    renderAdd() {




        return (
            <React.Fragment>

                <div className='ui sixteen wide column '>



                    <div class="ui grid">
                        <div class="eight wide column"><ChildSingleInput
                            inputType="text"
                            label="Company"
                            name="company"
                            value={this.state.newContact.comapny}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your company name"
                            errorMessage="Please enter a valid name"
                        /></div>
                        <div class="eight wide column"> <ChildSingleInput
                            inputType="text"
                            label="Position"
                            name="position"
                            value={this.state.newContact.position}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your position"
                            errorMessage="Please enter a valid position"
                        /></div>

                        <div class="eight wide column">
                            <ChildSingleInput
                                inputType="date"
                                label="Start"
                                name="start"
                                value={this.state.newContact.start}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your start"
                                errorMessage="Please enter a valid start"
                            />
                        </div>
                        <div class="eight wide column">
                            <ChildSingleInput
                                inputType="date"
                                label="End"
                                name="end"
                                value={this.state.newContact.end}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your end"
                                errorMessage="Please enter a valid end"
                            />

                          



                        </div>
                        <div class="sixteen wide column">
                            <ChildSingleInput
                                inputType="text"
                                label="Responsiilities"
                                name="responsibilities"
                                value={this.state.newContact.responsibility}
                                controlFunc={this.handleChange}
                                maxLength={80}
                                placeholder="Enter your responsibility"
                                errorMessage="Please enter a valid suburb"
                            />
                        </div>


                        {/* <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                <button type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button> */}
                    </div>

                    <button style={{ marginTop: "1rem" }} type="button" className="ui teal button" onClick={this.addLanguage} >Save</button>
                    <button style={{ marginTop: "1rem" }} type="button" className="ui teal button" onClick={this.closeAdd} >Cancel</button>

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


                        <Table className="sixteen column" singleLine>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Company</Table.HeaderCell>
                                    <Table.HeaderCell>Position</Table.HeaderCell>
                                    <Table.HeaderCell>Responsibilties</Table.HeaderCell>
                                    <Table.HeaderCell>Start</Table.HeaderCell>
                                    <Table.HeaderCell>End</Table.HeaderCell>
                                    <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.openAdd}>Add New</button></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.state.showEditSection && this.renderEdit()}
                                {
                                    this.props.experienceData.map((x) => {
                                        return (
                                            <Table.Row key={x.id}>
                                                <Table.Cell>{x.company}</Table.Cell>
                                                <Table.Cell>{x.position}</Table.Cell>
                                                <Table.Cell>{x.responsibilities}</Table.Cell>
                                                <Table.Cell>{this.dateformate(new Date(x.start), "display")}</Table.Cell>
                                                <Table.Cell>{this.dateformate(new Date(x.end))}</Table.Cell>
                                                <Table.Cell>


                                                    <button type="button" className="ui  basic button" onClick={() => { this.deleteLanguage(x) }} ><Icon name='delete' /></button>
                                                    <button type="button" className="ui   basic button" onClick={() => { this.openEdit(x) }} ><Icon name='edit' /></button>
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



    dateformate(Date, check) {
        const months = {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'July',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December',
        }
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        //const d = Date.toString()
        const year = Date.getFullYear()
        const date = Date.getDate()
        const monthIndex = Date.getMonth() + 1
        const monthName = months[Date.getMonth()]
        const dayName = days[Date.getDay()] // Thu
        //const formatted = ` ${year}/${monthIndex}/${date}`

        const formatted = check == "edit" ? `${date}/${monthIndex}/${year}` : ` ${date}th ${monthName}, ${year}`
        return formatted.toString()
    }

}
