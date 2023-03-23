import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { RemoveOfflineFormLS, RemoveUserLS } from "../../storage";
import { StoreContext } from "../../context";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import languages from "../../i18n/languages";
import { useTranslation } from "react-i18next";
import { Colors } from "@drummond-advisors/shared/constants";

const pages: any[] = [];

function ResponsiveAppBar() {
  const { dispatch } = React.useContext(StoreContext);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [tabValue, setTabValue] = React.useState(
    i18n.language === languages[0].label ? 0 : 1
  );

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSetTabValue = (_: any, newValue: number) => {
    setTabValue(newValue);
    i18n.changeLanguage(languages[newValue].label);
  };

  const settings = [
    {
      name: "Logout",
      onClick: () => {
        handleCloseUserMenu();
        dispatch({ type: `SET_USER`, payload: null });
        RemoveUserLS();
        RemoveOfflineFormLS();
        navigate("/");
      },
    },
  ];

  return (
    <AppBar position="static">
      <Box>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignSelf: "left",
            }}
          >
            <Tabs
              orientation={"horizontal"}
              value={tabValue}
              color="white"
              TabIndicatorProps={{
                style: {
                  backgroundColor: Colors.White,
                },
              }}
              onChange={handleSetTabValue}
            >
              {languages.map(item => (
                <Tab
                  {...item}
                  label={undefined}
                  icon={<Avatar alt="country" src={item.icon} />}
                />
              ))}
            </Tabs>
            {pages.map(page => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} style={{ margin: "0 1% 0 0" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem key={setting.name} onClick={() => setting.onClick()}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default ResponsiveAppBar;
