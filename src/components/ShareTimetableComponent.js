import React, { useState } from "react";
// import { DropdownButton, Dropdown } from "react-bootstrap";
import "./ComponentsStyle.css";
import {
  Button,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { FormatColorResetOutlined } from "@material-ui/icons";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default function ShareTimetableComponent(props) {
  const { combinations, currentTimeTablePage } = props;
  const combinationslength = combinations.length;
  const pages = [];
  for (let i = 0; i < combinationslength; i++) {
    pages.push(i + 1);
  }

  const [selectedPage, setSelectedPage] = useState(currentTimeTablePage);

  const [state, setState] = useState({ isNavOpen: false, isModalOpen: false });

  function toggleModal() {
    setState({
      ...state,
      isModalOpen: !state.isModalOpen,
    });
  }

  // function handleLogin(event) {
  //   toggleModal();
  //   alert(
  //     "Username: " +
  //       username.value +
  //       " Password: " +
  //       password.value +
  //       " Remember: " +
  //       remember.checked
  //   );
  //   event.preventDefault();
  // }

  function subShareTimetableComponent() {
    return (
      <div className="share-timetable">
        <p>Choose a timetable page to share</p>
        <FormControl
        //  className={classes.formControl} disabled={isIndexFixed}
        >
          <InputLabel htmlFor="page-native-simple">Page</InputLabel>
          <Select
            value={selectedPage}
            // value={indexes.indexOf(currentIdx)}
            native
            onChange={(event) => setSelectedPage(event.target.value)}
            // className={classes.selectEmpty}
          >
            <option key={0} value={currentTimeTablePage}>
              Current Timetable page
            </option>
            {pages.map((page) => {
              return (
                <option key={page} value={page}>
                  {page}
                </option>
              );
            })}
            {/* {indexes.map((tempVar, index) => {
              return (
                <option key={index} value={index}>
                  {tempVar.index_number}
                </option>
              );
            })} */}
          </Select>
        </FormControl>
      </div>
    );
  }

  const generateLink = () => {
    // console.log(useLocation());
    // console.log(window.location.href);
    const tempCombinationArray = [];
    for (const [key, value] of Object.entries(combinations[selectedPage - 1])) {
      tempCombinationArray.push(`${key}=${value}`);
    }
    console.log(`${window.location.href}?${tempCombinationArray.join("&")}`);
    // combinations[];
  };

  return (
    <>
      <Button outline onClick={toggleModal}>
        <span className="fa fa-sign-in fa-lg"></span> Share Timetable
      </Button>
      <Modal
        size="lg"
        isOpen={state.isModalOpen}
        toggle={toggleModal}
        fade={false}
      >
        <ModalHeader toggle={toggleModal}>
          <h2>Share Timetable</h2>
        </ModalHeader>
        <ModalBody class="modal fade bd-example-modal-lg">
          {subShareTimetableComponent()}
          <Button onClick={generateLink}>Share</Button>
        </ModalBody>
      </Modal>
    </>
  );
}

// export default class ShareTimetableComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.toggleNav = this.toggleNav.bind(this);
//     this.toggleModal = this.toggleModal.bind(this);
//     this.handleLogin = this.handleLogin.bind(this);

//     this.state = {
//       isNavOpen: false,
//       isModalOpen: false,
//     };
//   }

//   toggleNav() {
//     this.setState({
//       isNavOpen: !this.state.isNavOpen,
//     });
//   }

//   toggleModal() {
//     this.setState({
//       isModalOpen: !this.state.isModalOpen,
//     });
//   }

//   handleLogin(event) {
//     this.toggleModal();
//     alert(
//       "Username: " +
//         this.username.value +
//         " Password: " +
//         this.password.value +
//         " Remember: " +
//         this.remember.checked
//     );
//     event.preventDefault();
//   }

//   subShareTimetableComponent() {
//     return (
//       <div>
//         <div className="share-timetable">
//           <p>Choose a timetable to share</p>
//           <DropdownButton id="dropdown-basic-button" title="Select a timetable">
//             <Dropdown.Item class="dropdown" href="#/action-1">
//               Timetable 1
//             </Dropdown.Item>
//             <Dropdown.Item class="dropdown" href="#/action-2">
//               Timetable 2
//             </Dropdown.Item>
//             <Dropdown.Item class="dropdown" href="#/action-3">
//               Timetable 3
//             </Dropdown.Item>
//           </DropdownButton>
//         </div>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <>
//         <Row>
//           <div className="col-9" />
//           <Button className="col-3" outline onClick={this.toggleModal}>
//             <span className="fa fa-sign-in fa-lg"></span> Share Timetable
//           </Button>
//         </Row>

//         <Modal
//           size="lg"
//           isOpen={this.state.isModalOpen}
//           toggle={this.toggleModal}
//           fade={false}
//         >
//           <ModalHeader toggle={this.toggleModal}>
//             <h2>Share Timetable</h2>
//           </ModalHeader>
//           <ModalBody class="modal fade bd-example-modal-lg">
//             {this.subShareTimetableComponent()}
//           </ModalBody>
//         </Modal>
//       </>
//     );
//   }
// }
