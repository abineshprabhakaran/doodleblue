import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addContact, editContact } from '../_helper_/actions';
import { Row, Col } from 'react-bootstrap';

const Contact = (props) => {
    let [ToDisplay, ToDoDisplay] = useState({})
    let [currentContact, TodoContact] = useState({
        id: "",
        name: "",
        email: "",
        phonenumber: "",
        company:"",
        errors: {
            name: "",
            email: "",
            phonenumber: "",
            company:""
        }
    })
    useEffect(() => {
        if (props.pageAction.currentPage === "view") {
            let display = props.response.filter(el => el.id === props.pageAction.selectedData)
            if (!display.length) props.forwardPage({ currentPage: "" })
            ToDoDisplay({ DisplayData: display })
        } else if (props.pageAction.currentPage === "edit") {
            let display = props.response.filter(el => el.id === props.pageAction.selectedData)
            if (!display.length) props.forwardPage({ currentPage: "" })
            else {
                TodoContact({
                    ...currentContact,
                    name: display[0].name,
                    email: display[0].email,
                    phonenumber: display[0].phonenumber,
                    company: display[0].company,
                    id: display[0].id
                })
            }

        }
    }, [props.pageAction.currentPage, props.pageAction.selectedData, props.response])

    const handleChange = (e) => {
        TodoContact({
            ...currentContact,
            [e.target.name]: e.target.value.trim(),
            errors: {
                ...currentContact.errors,
                [e.target.name]: ""
            }
        })
    }
    const validate = () => {
        if (!currentContact.name) {
            TodoContact({
                ...currentContact,
                errors: {
                    ...currentContact.errors,
                    name: "Enter the Name"
                }
            })
            return false
        } else if (!currentContact.email) {
            TodoContact({
                ...currentContact,
                errors: {
                    ...currentContact.errors,
                    email: "Enter the Email Address"
                }
            })
            return false
        }
        else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(currentContact.email)) {
            TodoContact({
                ...currentContact,
                errors: {
                    ...currentContact.errors,
                    email: "Enter the Valid Email Address"
                }
            })
            return false
        }
        else if (!currentContact.company) {
            TodoContact({
                ...currentContact,
                errors: {
                    ...currentContact.errors,
                    company: "Enter the Company name"
                }
            })
            return false
        }
        else if (!currentContact.phonenumber) {
            TodoContact({
                ...currentContact,
                errors: {
                    ...currentContact.errors,
                    phonenumber: "Enter the Phone Number"
                }
            })
            return false
        }
        return true

    }
    const AddContact = () => {
        let isValid = validate();
        let { name, email, phonenumber, company } = currentContact
        if (isValid) {
            props.addcontactstore({ name, email, phonenumber, company }, props.response)
            props.forwardPage({ currentPage: "" })
        }
    }

    const editContact = () => {
        let isValid = validate()
        let { id, name, email, phonenumber, company } = currentContact
        if (isValid) {
            props.editcontactstore({ id, name, email, phonenumber, company }, props.response)
            props.forwardPage({ currentPage: "" })
        }

    }
    return (
        <React.Fragment>
            {props.pageAction.currentPage === "add" || props.pageAction.currentPage === "edit" ?
                <div className="p-4 contactBoxMainMenu mt-5" >
                    <div>
                    <div className="d-flex justify-content-center mt-3">
                        <h3 className="boldFont text-uppercase">  
                         {props.pageAction.currentPage === "edit" ?
                         <span> Edit Contact</span>
                        :
                        <span> Add Contact</span>
                        } </h3>
                        </div>
                        <div className="mt-5">
                            <div>
                                <div className="boldFont f-18 text-uppercase">Name</div>
                                <div className="mt-2">
                                    <input className="editInput"
                                    placeholder="Enter the name"
                                        type="text"
                                        name="name"
                                        onChange={(e) => handleChange(e)}
                                        value={currentContact.name}
                                    />
                                </div>
                            </div>
                            <div>
                                {currentContact.errors.name ? <p className="text-danger">{currentContact.errors.name}</p> : null}
                                <div className="boldFont f-18 text-uppercase">Email</div>
                                <div className="mt-2">
                                    <input className="editInput"
                                     placeholder="Enter the Email Address"
                                        type="text"
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                        value={currentContact.email}
                                    />
                                </div>
                            </div>
                            <div>
                                {currentContact.errors.email ? <p className="text-danger">{currentContact.errors.email}</p> : null}
                                <div className="boldFont f-18 text-uppercase">Mobile</div>
                                <div className="mt-2">
                                    <input className="editInput"
                                     placeholder="Enter the Mobile Number"
                                        type="number"
                                        name="phonenumber"
                                        onChange={(e) => handleChange(e)}
                                        value={currentContact.phonenumber}
                                    />
                                </div>
                            </div>
                            <div>
                                {currentContact.errors.phonenumber ? <p className="text-danger">{currentContact.errors.phonenumber}</p> : null}
                                <div className="boldFont f-18 text-uppercase">Company</div>
                                <div className="mt-2">
                                    <input className="editInput"
                                     placeholder="Enter the Company Name"
                                        type="text"
                                        name="company"
                                        onChange={(e) => handleChange(e)}
                                        value={currentContact.company}
                                    />
                                </div>
                            </div>
                            {currentContact.errors.company ? <p className="text-danger">{currentContact.errors.company}</p> : null}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                    {props.pageAction.currentPage === "edit" ?
                        <button className="editButtonOne"  onClick={editContact} > Save Contact </button>
                        :
                        <button  className="editButtonOne" onClick={AddContact} > Add Contact </button>
                        }
                        </div>
                </div>
                : props.pageAction.currentPage === "view" && ToDisplay.DisplayData ?
                    <div className="p-4 contactBoxMainMenu mt-5">
                        <div className="d-flex justify-content-center mt-3">
                            <div className="letterImageOne"> {(ToDisplay.DisplayData[0].name.match(/[a-zA-Z]/) || ['NA']).pop()}</div>
                        </div>
                        <div className="mt-5">
                            <Row className="py-3 borderBottomView">
                                <Col lg={4} className="text-uppercase boldFont f-18 ">
                                    <div>
                                        Name
                                </div>
                                </Col>
                                <Col lg={8}>
                                    <div>{ToDisplay.DisplayData[0].name}</div>
                                </Col>
                            </Row>
                            <Row className="py-3 borderBottomView">
                                <Col lg={4} className="text-uppercase boldFont f-18 ">
                                    <div>
                                        Email
                                </div>
                                </Col>
                                <Col lg={8}>
                                    <div>{ToDisplay.DisplayData[0].email}</div>
                                </Col>
                            </Row>
                            <Row className="py-3 borderBottomView">
                                <Col lg={4} className="text-uppercase boldFont f-18 ">
                                    <div>
                                        Mobile
                                </div>
                                </Col>
                                <Col lg={8}>
                                    <div>{ToDisplay.DisplayData[0].phonenumber}</div>
                                </Col>
                            </Row>
                            <Row className="pt-3 pb-5">
                                <Col lg={4} className="text-uppercase boldFont f-18 ">
                                    <div>
                                        Company
                                </div>
                                </Col>
                                <Col lg={8}>
                                    <div>{ToDisplay.DisplayData[0].company}</div>
                                </Col>
                            </Row>

                        </div>
                    </div>
                    : null
            }
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        response: state.contact.contacts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addcontactstore: (data, jsondata) => { dispatch(addContact(data, jsondata)) },
        editcontactstore: (data, jsondata) => { dispatch(editContact(data, jsondata)) }
    }
}

//export default ReUseContact
export default connect(mapStateToProps, mapDispatchToProps)(Contact);