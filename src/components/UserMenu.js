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
                // console.log("logout");
                // setToken(undefined);
                sessionStorage.clear();
                window.location.reload(false);
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </StyledMenuItem>,
            <StyledMenuItem key="2">
              <ListItemIcon>
                <FaceIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </StyledMenuItem>,
            <StyledMenuItem key="3">
              <ListItemIcon>
                <EventIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Saved timetables" />
            </StyledMenuItem>,
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
