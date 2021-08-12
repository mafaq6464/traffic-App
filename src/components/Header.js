import { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false
        }

        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render (){
        return (
            <Navbar color="light" light>
                <NavbarBrand href="/" className="mr-auto">{this.props.appName}</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/">{this.props.count} Traffic Accidents</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
    
}

export default Header;