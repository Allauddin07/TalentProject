import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)

        const details = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: '',
                street: '',
                suburb: '',
                postCode: '',
                City: "",
                Country: ""

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

    openEdit() {
        const details = Object.assign({}, this.props.addressData)
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

        const data = Object.assign({}, this.state.newContact)
        this.props.saveProfileData({ address: data })
        this.closeEdit()
    }



    render() {

        console.log(this.state.newContact)
        console.log(this.props.addressData.postCode)
        console.log(this.props.addressData.city)

        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()

        )

    }

    renderEdit() {

        let countriesOptions = [];
        let citiesOptions = [];
        let selectedCountry = this.state.newContact.country
        let selectedCity = this.state.newContact.city
        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null) {

            var popCities = Countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br /></span>
        }

        return (

            <div className='ui sixteen wide column '>



                <div class="ui grid">
                    <div class="five wide column"><ChildSingleInput
                        inputType="text"
                        label="Number"
                        name="number"
                        value={this.state.newContact.number}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your number"
                        errorMessage="Please enter a valid number"
                    /></div>
                    <div class="six wide column"> <ChildSingleInput
                        inputType="text"
                        label="Street"
                        name="street"
                        value={this.state.newContact.street}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your street"
                        errorMessage="Please enter a valid street"
                    /></div>
                    <div class="five wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newContact.suburb}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your suburb"
                            errorMessage="Please enter a valid suburb"
                        />
                    </div>
                    <div class="five wide column">
                        <ChildSingleInput
                            inputType="text"
                            label="PostCode"
                            name="postCode"
                            value={this.state.newContact.postCode}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your postcode"
                            errorMessage="Please enter a valid postcode"
                        />
                    </div>
                    <div class="six wide column">
                        <label htmlFor="">Country</label>
                        <select className="ui right labeled dropdown" style={{ marginBottom: "1rem", marginTop: "0.28571429rem" }}
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>
                    <div class="five wide column">
                    <label htmlFor="">City</label>
                        <select style={{ marginBottom: "1rem", marginTop: "0.28571429rem" }}
                            className="ui dropdown "
                            placeholder="City"
                            value={selectedCity}
                            onChange={this.handleChange}
                            name="city">
                            <option value="0"> Select a town or city</option>
                            {popCities}
                        </select>
                    </div>


                    {/* <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                    <button type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button> */}
                </div>

                <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                <button type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button>

                {/* <ChildSingleInput
                    inputType="number"
                    label="Number"
                    name="number"
                    value={this.state.newContact.number}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your number"
                    errorMessage="Please enter a valid number"
                />
                <ChildSingleInput
                    inputType="text"
                    label="Street"
                    name="street"
                    value={this.state.newContact.street}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your street"
                    errorMessage="Please enter a valid street"
                />


                <ChildSingleInput
                    inputType="text"
                    label="Suburb"
                    name="suburb"
                    value={this.state.newContact.suburb}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your suburb"
                    errorMessage="Please enter a valid suburb"
                />

                <ChildSingleInput
                    inputType="text"
                    label="PostCode"
                    name="postCode"
                    value={this.state.newContact.postCode}
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Enter your postcode"
                    errorMessage="Please enter a valid postcode"
                />

                <select className="ui right labeled dropdown"
                    placeholder="Country"
                    value={selectedCountry}
                    onChange={this.handleChange}
                    name="country">

                    <option value="">Select a country</option>
                    {countriesOptions}
                </select>





                <select style={{ marginBottom: "1rem", marginTop: "1rem" }}
                    className="ui dropdown "
                    placeholder="City"
                    value={selectedCity}
                    onChange={this.handleChange}
                    name="city">
                    <option value="0"> Select a town or city</option>
                    {popCities}
                </select>


                <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                <button type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button> */}



            </div>


        )
    }

    renderDisplay() {


        let number = this.props.addressData ? `${this.props.addressData.number}` : ""
        let street = this.props.addressData ? `${this.props.addressData.street}` : ""
        let suburb = this.props.addressData ? `${this.props.addressData.suburb}` : ""
        let postcode = this.props.addressData ? `${this.props.addressData.postCode}` : ""

        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""



        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>

                        <p>Address: {`${number} ${street}, ${suburb}, ${postcode}`}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>


                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}









export class Nationality extends React.Component {
    constructor(props) {
        super(props)

        const details = props.nationalityData ?
            props.nationalityData
            : {
                nationality: ''
            }





        this.state = {
            showEditSection: false,
            newContact: { nationality: details }
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)


    }


    openEdit() {
        const details = this.props.nationalityData
        this.setState({
            showEditSection: true,
            newContact: { nationality: details }
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


        let countriesOptions = [];

        let selectedCountry = this.state.newContact.nationality

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);



        return (

            <div className='ui sixteen wide column '>





                <select style={{ marginBottom: "1rem", marginTop: "1rem" }}
                    className="ui right labeled dropdown"
                    placeholder="Country"
                    value={selectedCountry}
                    onChange={this.handleChange}
                    name="nationality">

                    <option value="">Select a country</option>
                    {countriesOptions}
                </select>


                <button type="button" className="ui teal button" onClick={this.saveContact} >Save</button>
                <button type="button" className="ui teal button" onClick={this.closeEdit} >Cancel</button>



            </div>


        )
    }

    renderDisplay() {



        let countriesOptions = [];

        let selectedCountry = this.state.newContact.nationality
        let Country = this.props.nationalityData

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>


                        <select style={{ marginBottom: "1rem", marginTop: "1rem" }}
                            className="ui right labeled dropdown"
                            placeholder="Country"
                            value={Country}
                            disabled
                           
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>

                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }





}