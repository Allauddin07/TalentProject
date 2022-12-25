/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
//import  './upload.module.css';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showEditSection: false,
            selectedFile: null,
            selectPhoto: null
        }


        this.closeEdit = this.closeEdit.bind(this)

        this.saveContact = this.saveContact.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.onFileUpload = this.onFileUpload.bind(this)


    };


    onFileChange(event) {


        this.setState({
            showEditSection: true,
            selectedFile: URL.createObjectURL(event.target.files[0]),
            selectPhoto: event.target.files[0]


        });

    };

    // On file upload (click the upload button)
    onFileUpload() {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectPhoto,
            this.state.selectPhoto.name
        );
        return formData
    }



    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }


    saveContact() {
        const data = Object.assign({}, { photUrl: this.state.selectPhoto })
        console.log(data)
       
        this.savePhoto()
        this.closeEdit()
    }


    savePhoto() {

        var urls = this.props.savePhotoUrl

       
        const formData = new FormData();
        formData.append('file', this.state.selectPhoto);
        console.log(formData)

        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }


        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: urls,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                //'Content-Type': 'application/json'
            },

            type: "POST",
            processData: false,
            contentType: false,
            //dataType: "json",
            data: formData,
            //data: JSON.stringify(formData),
            success: function (res) {
                console.log(res)
                    if (res.success == true) {
                        TalentUtil.notification.show("Photo updated successfully", "success", null, null)
                        this.props.loadData()
                       
                    } else {
                        TalentUtil.notification.show("did not update successfully", "error", null, null)
                    }
            }.bind(this)
        })

    }







    render() {
        console.log(this.state.selectPhoto)
        const formData = new FormData();
        formData.append('file', this.state.selectPhoto);
        console.log(formData)



        return (

            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()

        )

    }


    renderEdit() {

        return (

            <div className='row'>
                <div className="ui eight wide column">

                    <h3>Profile Photo</h3>


                </div>
                <div className="ui eight wide column">

                    <div class="">

                        <img class="ui medium circular image" src={this.state.selectedFile}
                            style={{ width: "200px", height: "200px", border: "1px solid black" }} />


                        <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "right" }}>
                            <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.closeEdit}>Cancel</button>
                            <button style={{ marginTop: "1.5rem" }} type="button" className="ui right floated teal button" onClick={this.saveContact}>
                                <i class="upload icon"></i>
                                Upload</button>
                        </div>


                    </div>

                </div>

            </div>
        )

    }

    renderDisplay() {

        return (

            <div className='row'>
                <div className="ui eight wide column">

                    <h3>Profile Photo</h3>


                </div>
                <div className="ui eight wide column">

                    {
                        this.props.imageId ?
                            <div class="">
                                <label for="embedpollfileinput" className="ui massive circular button" style={{
                                    border: "1px solid black",
                                    background: "none",
                                    padding: "0%"
                                    //padding: "2.785714em 2.5em 2.785714em"
                                }}>
                                    <img class="ui medium circular image" src={this.props.imageId}
                                        style={{ width: "200px", height: "200px" }} />



                                </label>
                                <input type="file" className="inputfile" id="embedpollfileinput"
                                    multiple accept="image/*"
                                    onChange={this.onFileChange}

                                    style={{
                                        width: "0.1px",
                                        height: "0.1px",
                                        opacity: "0",
                                        overflow: "hidden",
                                        position: "absolute",
                                        zIndex: "-1"
                                    }} />



                            </div>
                            :
                            <div class="">
                                <label for="embedpollfileinput" className="ui massive circular button" style={{
                                    border: "1px solid black",
                                    background: "none",
                                    padding: "2.785714em 2.5em 2.785714em"
                                }}>
                                    <i className="huge camera icon" style={{ margin: "0%" }}>  </i>
                                </label>
                                <input type="file" className="inputfile" id="embedpollfileinput"
                                    multiple accept="image/*"
                                    onChange={this.onFileChange}

                                    style={{
                                        width: "0.1px",
                                        height: "0.1px",
                                        opacity: "0",
                                        overflow: "hidden",
                                        position: "absolute",
                                        zIndex: "-1"
                                    }} />



                            </div>

                    }
                </div>

            </div>
        )
    }
}

