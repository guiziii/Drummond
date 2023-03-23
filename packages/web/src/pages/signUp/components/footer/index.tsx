import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Setup from "../../config";

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
      <Grid item xs={12} md={12} lg={12}>
        <Link
          onClick={() => NavigateTo("/")}
          component="button"
          variant="caption"
        >
          {t(Strings.ALREADY_HAVE_AN_ACCOUNT_TEXT)}
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
