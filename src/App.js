import { useEffect, useState } from 'react';
import './App.css';

// Images 
import home from './assets/images/home.svg';
import user from './assets/images/user.svg';
import document from './assets/images/document.svg';
import time from './assets/images/clock.svg';
import database from './assets/images/database.svg';
import settings from './assets/images/settings.svg';
import phoneBook from './assets/images/phone-book.svg';
import {Row,Col} from 'react-bootstrap';

// Contact Components 
import Contactlist from './Contact/Contactlist';
import Contact from './Contact/Contact';

function App() {
  let [Action, pageRedirect] = useState({
    currentPage: ""
  })

  useEffect(() => { }, [Action])
  return (
    <div className="d-flex">
      <div className="sideBar">
        <div>

          <div className="mt-5 py-2 d-flex justify-content-center">
            <div>
              <img src={home} className="sideMenuIcon" />
            </div>
          </div>

          <div className="mt-5 py-2 d-flex justify-content-center activeMenu">
            <div>
              <img src={user} className="sideMenuIcon" />
            </div>
          </div>

          <div className="mt-5 py-2 d-flex justify-content-center">
            <div>
              <img src={document} className="sideMenuIcon" />
            </div>
          </div>

          <div className="mt-5 py-2 d-flex justify-content-center">
            <div>
              <img src={time} className="sideMenuIcon" />
            </div>
          </div>

          <div className="mt-5 py-2 d-flex justify-content-center">
            <div>
              <img src={database} className="sideMenuIcon" />
            </div>
          </div>

          <div className="mt-5 py-2 d-flex justify-content-center">
            <div>
              <img src={settings} className="sideMenuIcon" />
            </div>
          </div>

        </div>
      </div>
      <div class="mainMenu">
        <div>
        <div className="p-5">
                <div className="d-flex align-items-center">
                  <div>
                    <img src={phoneBook} className="phoneBook" />
                  </div>
                  <div className="pl-3">
                    <h4 className="boldFont mb-0">
                      Contacts
                    </h4>
                    <div className="pt-1">
                      Contact Management Tool
                    </div>
                </div>
              </div>
              </div>
          <Row className="p-5 justify-content-between flex-wrap-reverse">
            <Col lg={7}>
              
              <Contactlist forwardPage={pageRedirect} pageAction={Action} />
            </Col>
            <Col lg={5} className="pl-5">
              {Action.currentPage ? <Contact forwardPage={pageRedirect} pageAction={Action} /> : null}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default App;
