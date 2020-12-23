import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getContacts, deleteContact } from '../_helper_/actions';
import { Row, Col } from 'react-bootstrap';


const Contactlist = (props) => {
    const [DisplayData, ActionToDispalay] = useState({
        SelectedArray: []
    })
    const [ProcessedData, ActionToProsses] = useState()
    const [PageState, ActionToPageState] = useState({
        inputValue: "",
        errordisplay: 'No Data Found'
    })

    useEffect(() => props.getContact(), [])
    useEffect(() => {

        if (props.response) {
            let processArray = { ...ProcessedData, DisplayArray: props.response, SelectedArray: props.response }
            ActionToProsses(processArray)
        }
    }, [props.response.length, DisplayData])



    const handleChange = (event) => {
        let modifiedObject = { ...PageState, [event.target.name]: event.target.value };
        let value = modifiedObject.inputValue
        ActionToPageState(modifiedObject)
        let filteredArray = ProcessedData.DisplayArray.filter(dataToBe => dataToBe.name.toLowerCase().includes(value.toLowerCase()));
        ActionToProsses({ ...ProcessedData, SelectedArray: filteredArray })
        if (filteredArray.length === 0) ActionToPageState({ ...PageState, errordisplay: "No Contact Found", [event.target.name]: event.target.value })
    }

    const addTo = () => {
        props.forwardPage({ currentPage: "add" })
    }
    const EditTo = (e) => {
        props.forwardPage({ currentPage: "edit", selectedData: e })
    }
    const viewTo = (e) => {
        props.forwardPage({ ...props.pageAction, currentPage: "view", selectedData: e })
    }

    const DeleteTo = (e) => {
        let resultDB = ProcessedData.DisplayArray.filter(i => i.id !== e);
        props.isDeleteContact(resultDB)
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-5">
                <input
                    className="customInput"
                    type="text"
                    name="inputValue"
                    placeholder="Search Contacts"
                    onChange={(e) => handleChange(e)}
                    value={PageState.inputValue}
                ></input>
                <button className="addButton" onClick={addTo}> Add Contact</button>
            </div>
            <Row className="py-3 align-items-center justify-content-between contactBoxMain my-3">
                <Col lg={1}>

                </Col>
                <Col lg={5} className="boldFont f-18">
                    Basic Info
                </Col>
                <Col lg={3} className="boldFont f-18">
                    Company
                 </Col>
                <Col lg={2} className="boldFont f-18">
                   Actions
                     </Col>
            </Row>
            {ProcessedData && ProcessedData.SelectedArray && ProcessedData.SelectedArray.length ? ProcessedData.SelectedArray.map((Selecteditems, index) => {
                return <Row className=" py-4 align-items-center justify-content-between contactBox my-3" key={Selecteditems.id}  >
                    <Col lg={1} onClick={() => viewTo(Selecteditems.id)}>
                        <div className="letterImage">
                            {(Selecteditems.name.match(/[a-zA-Z]/) || ['NA']).pop()}
                        </div>
                    </Col>
                    <Col lg={5} className="px-3" onClick={() => viewTo(Selecteditems.id)}>
                        <div className="fontBold text-uppercase">{Selecteditems.name}</div>
                        <div className="text-xs">{Selecteditems.email}</div>
                    </Col>
                    <Col lg={3} onClick={() => viewTo(Selecteditems.id)}>
                        <div>{Selecteditems.company}</div>
                    </Col>
                    <Col lg={2}>
                        <div>
                            <button className="editButton" onClick={(e) => EditTo(Selecteditems.id)} > Edit </button>
                        </div>
                        <div className="mt-3">
                            <button className="deleteButton" onClick={(e) => DeleteTo(Selecteditems.id)} > Delete </button>
                        </div>
                    </Col>

                </Row>
            }) : <div className="my-3  text-center font-weight-bold no-msg"> 
            <div className="contactBoxMainMenu py-4">
            {PageState.errordisplay}
              </div>  
          
             </div>
             }
        </div>
    )
}



const mapStateToProps = state => {
    return {
        response: state.contact.contacts
    }
}
const mapDispatchToProps = dispatch => {
    return {

        getContact: () => { dispatch(getContacts()) },
        isDeleteContact: (id) => { dispatch(deleteContact(id)) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Contactlist);