import logo from "../../../assets/images/logo.svg";
import ctl from "@netlify/classnames-template-literals";
import { Link } from "react-router-dom";
const MainHeader = () => {
  const headerStyle = ctl(`text-center`);
  const logoStyle = ctl(`mx-auto block `);
  return (
    <header className={headerStyle}>
      <Link to="/">
        <img src={logo} className={logoStyle} alt="Covid 19 tracker" />
      </Link>
    </header>
  );
};

export default MainHeader;
