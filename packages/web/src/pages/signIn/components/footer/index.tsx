import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
import Setup from "../../config";
import { NavLink, useNavigate } from "react-router-dom";

const { Strings } = Setup;

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const NavigateTo = (page: string) => {
    if (page) {
      navigate(page);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} md={6} lg={6}>
        <Link component="button" variant="caption">
          {t(Strings.FORGOT_PASSWORD_TEXT)}
        </Link>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Link
          onClick={() => NavigateTo("signUp")}
          component="button"
          variant="caption"
          textAlign="right"
        >
          {t(Strings.DONT_HAVE_AN_ACCOUNT_TEXT)}
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
