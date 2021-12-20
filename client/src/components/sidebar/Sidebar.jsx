import "./sidebar.css";
import {LineStyle,PermIdentity} from "@material-ui/icons";
import {ProductionQuantityLimits,ListAlt} from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
      
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">products</h3>
          <ul className="sidebarList">
            <Link to="/NewProduct" className="link">
              <li className="sidebarListItem">
                <ProductionQuantityLimits className="sidebarIcon" />
                Add Product
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <ListAlt className="sidebarIcon" />
                products list
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">users</h3>
          <ul className="sidebarList">
            <Link to="/Newuser" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Add User
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <ListAlt className="sidebarIcon" />
                users list
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
