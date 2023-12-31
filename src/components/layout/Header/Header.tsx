import './Header.scss';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { NavigationDropdown } from '../../dropdowns';
import { useComponentDimensions } from '../../../hooks';

interface HeaderProps {
  menu: Menu;
  children?: React.ReactNode | React.ReactNode[];
  collapseWidth?: number;
}

const Header = ({ menu, children, collapseWidth = 630 }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { ref: containerRef, width: containerWidth } = useComponentDimensions();

  const { pathname } = location;
  const isCurrentRoute = (routeToCheck: string) => {
    const adminPathname = `${pathname}`;
    if (pathname === routeToCheck && routeToCheck === '/') return true;
    if (pathname.includes(routeToCheck) && routeToCheck !== '/') return true;
    if (adminPathname.includes(routeToCheck) && routeToCheck !== '/')
      return true;
  };

  const renderDesktopNav = () => {
    return (
      <nav className="header__nav-desktop">
        <ul>
          {menu.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                className={() =>
                  isCurrentRoute(link.path)
                    ? 'header__navlink header__navlink--active'
                    : 'header__navlink'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  const renderMobileNav = () => {
    return (
      <div className="header__nav-mobile">
        <NavigationDropdown menu={menu} />
      </div>
    );
  };

  return (
    <>
      <div className="header">
        <div className="header__container" ref={containerRef}>
          <div className="header__logo" onClick={() => navigate('/')}>
            <img src="/assets/react.svg" />
          </div>
          {containerWidth > collapseWidth
            ? renderDesktopNav()
            : renderMobileNav()}
          {children}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
