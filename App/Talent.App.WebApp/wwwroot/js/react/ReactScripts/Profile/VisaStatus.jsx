import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import DatePicker from "react-datepicker";
import moment from 'moment/moment.js';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)







        this.state = {
            showEditSection: false,
            newContact: {
                visaStatus: props.visaStatus,
                visaExpiryDate: props.visaExpiryDate
            }
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)


    }


    openEdit() {
        const visa = this.props.visaStatus
        const expiry = this.props.visaExpiryDate
        this.setState({
            showEditSection: true,
            newContact: {
                visaStatus: visa,
                visaExpiryDate: expiry
            }
        })
    }

    update() {
        const visa = this.props.visaStatus
        const expiry = this.props.visaExpiryDate
        this.setState({
            newContact: {
                visaStatus: visa,
                visaExpiryDate: expiry
            }
        })
    }


    // componentDidUpdate(prevProps, prevState){


    //     if (prevState.newContact !== this.state.newContact) {
    //         this.update()
    //       }
    // }

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
        console.log(this.state.newContact)
    }

    // componentDidUpdate(){
    //     this.setState({

    //         newContact: {
    //             visaStatus: this.props.visaStatus,
    //             visaExpiryDate: this.props.visaExpiryDate
    //         }
    //     })
    // }

    saveContact() {
        //console.log(this.props.componentId)


        const data = Object.assign({}, this.state.newContact)
        this.props.saveProfileData(data)
        this.closeEdit()
    }


    render() {

        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()

        )
    }



    renderEdit() {

        console.log(this.state.newContact)


        let visaOptions = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"];

        let selectedvisa = this.state.newContact.visaStatus
        var visaExpiryDate = this.dateformate(new Date(this.state.newContact.visaExpiryDate))

        var visa = visaOptions.map((x) => <option key={x} value={x}>{x}</option>);


        return (
            <div className='row'>
                <div className="ui seven wide column">
                    <React.Fragment>

                        <label htmlFor="">Visa Type</label>
                        <select style={{ marginBottom: ".5rem", marginTop: ".3rem" }}
                            className="ui right labeled dropdown"
                            placeholder="visatype"
                            value={selectedvisa}
                            onChange={this.handleChange}
                            name="visaStatus">

                            <option value="">Select a visa</option>
                            {visa}
                        </select>
                    </React.Fragment>

                </div>

                {this.state.newContact.visaStatus == "Work Visa" || this.state.newContact.visaStatus == "Student Visa" ?
                    <div className="ui five wide column">
                        <React.Fragment>

                            
                            <div style={{ marginBottom: ".3rem" }}>
                                <label htmlFor="">Visa Expiry</label>
                            </div>
                            <DatePicker style={{ display: "none", marginTop: ".3rem" }} name="visaExpiryDate" placeholder="please enter start date"
                                value={visaExpiryDate}
                                onChange={(date) => this.setState({
                                    newContact: {
                                        visaStatus: this.state.newContact.visaStatus,
                                        visaExpiryDate: moment(date).format(),

                                    }
                                })}
                            />

                        </React.Fragment>

                    </div> : ""

                }

                <div className="ui four wide column" >
                <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.closeEdit}>Cancel</button>
                    <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.saveContact}>Save</button>

                </div>


            </div>
        )
    }

    renderDisplay() {



        console.log(this.state.newContact)

        var visaExpiryDate = this.dateformate(new Date(this.props.visaExpiryDate))
        let visaOptions = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"];

        let selectedvisa = this.props.visaStatus

        var visa = visaOptions.map((x) => <option key={x} value={x}>{x}</option>);


        return (
            <div className='row'>
                <div className="ui seven wide column">
                    <React.Fragment>

                        <label htmlFor="">Visa Type</label>
                        <select style={{ marginBottom: ".5rem", marginTop: ".3rem" }}
                            className="ui right labeled dropdown"
                            placeholder="visatype"
                            value={selectedvisa}
                            disabled
                            onChange={this.handleChange}
                            name="visaStatus">

                            <option value="">Select a visa</option>
                            {visa}
                        </select>
                    </React.Fragment>

                </div>

                {this.props.visaStatus == "Work Visa" || this.props.visaStatus == "Student Visa" ?
                    <div className="ui seven wide column">
                        <React.Fragment>

                           
                            <div style={{ marginBottom: ".3rem" }}>
                                <label htmlFor="">Visa Expiry</label>
                            </div>

                            <DatePicker disabled style={{ display: "none",marginTop: ".3rem" }} name="visaExpiryDate" placeholder="please enter start date"
                                value={visaExpiryDate}
                                onChange={(date) => this.setState({ startD: moment(date).format() })}
                            />

                        </React.Fragment>

                    </div> : ""

                }

                <div className="ui two wide column" >
                    <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                    
                </div>


            </div>
        )
    }


    dateformate(Date) {
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

        const formatted = `${date}/${monthIndex}/${year}`
        return formatted.toString()
    }


}