import React from 'react';

import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Dropdown} from "react-bootstrap";
import { Button, ButtonToolbar, OverlayTrigger, Popover } from 'react-bootstrap';

export default class NavbarInstance extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      value: '',
      dropdown: false
    }

    this.handleDropdownClick = this.handleDropdownClick.bind(this);
    this.handlePopoverClick = this.handlePopoverClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDropdownClick(e) {
    var dropdown = this.state.dropdown;
    var show = this.state.show;
    if(!dropdown) {
      this.setState({dropdown: true});
    } else if (dropdown && show) {
      this.setState({dropdown: true});
    } else if (dropdown && !show) {
      this.setState({dropdown: false});
    }
    console.log(this.state.dropdown);
    
  }

  handlePopoverClick(e) {
    this.setState({
      target: e.target, 
      show: !this.state.show, 
      dropdown: true
    });
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSubmit(e) {
    alert("the state is" + this.state.value);
  }

  render() {
    const createGroupPopover = (
      <Popover id="popover-trigger-click-root-close" title="Create Group">
        <input type="text" id="group-name-input" placeholder="Group Name" onChange={this.handleChange}></input>
        <input type="submit" id="submit-new-group" value="Create" onClick={this.handleSubmit}></input>
      </Popover>
    )
    return(
      <Navbar style={{zIndex: 500}} inverse fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">Bucket</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavDropdown onClick={this.handleDropdownClick} open={this.state.dropdown} eventKey={1} id="groups-dropdown" title="Groups">
              {this.props.groups.map((group)=>{
                return (<MenuItem eventKey={group.dropdownid} key={group.id.toString()} href="">{group.title}</MenuItem>)
              })}
              <MenuItem divider />
              <ButtonToolbar>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={createGroupPopover}>
                  <MenuItem onClick={this.handlePopoverClick} id="create-group-button">
                    Create New Group
                  </MenuItem>
                </OverlayTrigger>
              </ButtonToolbar>
            </NavDropdown>
            <NavItem eventKey={2} href="/archive.html">Bucket'd</NavItem>
              <NavDropdown eventKey={3} title="Settings" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1} href="/settings.html">Account Settings</MenuItem>
                <MenuItem eventKey={3.2} href="/index.html">Logout</MenuItem>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}