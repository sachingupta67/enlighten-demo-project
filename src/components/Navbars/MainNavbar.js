import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import { history } from "../../redux/Utils/history";
import Colors from "../../redux/Constants/Colors";
function MainNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar
      className={classnames("fixed-top")}
      expand="lg"
      style={{
        backgroundColor: Colors.colorPrimaryDark,
        paddingTop: 0,
      }}
    >
      <Container>
        <div className="navbar-translate" style={styles.navLink}>
          <NavbarBrand
            data-placement="bottom"
            to="/home"
            title="Enlighten 365"
            tag={Link}
          >
            <img
              src={require("../../assets/img/enlighten-logo.png")}
              alt="enlighten-logo"
              width="50"
              height="50"
              style={{ margin: "-15px" }}
            />
            <span style={styles.navLink}>Enlighten 365</span>
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1 " />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink to="/home" tag={Link} style={styles.navLink}>
                <i className="fa fa-home " /> Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/profile" tag={Link} style={styles.navLink}>
                <i className="fa fa-user" /> Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/report" tag={Link} style={styles.navLink}>
                <i className="fa  fa-file-archive-o" /> Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                onClick={() => {
                  window.localStorage.clear("user");
                  history.push("/");
                }}
                style={styles.navLink}
              >
                <i className="fa fa-sign-out" />
                Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

const styles = {
  navLink: {
    color: Colors.WHITE_COLOR,
  },
};

export default MainNavbar;
