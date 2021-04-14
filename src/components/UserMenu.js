import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FaceIcon from "@material-ui/icons/Face";
import EventIcon from "@material-ui/icons/Event";
// import useToken from "../custom hooks/useToken";
import { useApp } from "../context/AppContextProvider";
import { useHistory } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const history = useHistory();
  // const { token, setToken } = useToken();
  const appContext = useApp();
  const token = appContext.token;
  const setToken = appContext.setToken;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      history.push("/");
      window.location.reload(false);
    }
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        // color="primary"
        onClick={handleClick}
      >
        <AccountCircleIcon style={{ color: "white" }} fontSize="large" />
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {token ? (
          [
            <StyledMenuItem
              key="1"
              onClick={() => {
                logout();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledMenuItem>,
            <Link to="/profile">
              <StyledMenuItem key="2">
                <ListItemIcon>
                  <FaceIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </StyledMenuItem>
            </Link>,
            <Link to="/savedtimetables">
              <StyledMenuItem key="3">
                <ListItemIcon>
                  <EventIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Saved items" />
              </StyledMenuItem>
            </Link>,
          ]
        ) : (
          <Link to="/login">
            <StyledMenuItem>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </StyledMenuItem>
          </Link>
        )}
      </StyledMenu>
    </div>
  );
}
