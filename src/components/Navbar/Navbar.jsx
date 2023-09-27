import { Link, useNavigate } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons//io'
import { useState, useRef, useEffect } from 'react';
import { useJwt } from "react-jwt";
import useToken from '../../context/Helpers/useToken'
function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('session_token');
    navigate("/login", { replace: true });
  };
  const { token } = useToken();
  if (!token) {
    navigate("/login")
  }
  const { decodedToken, isExpired } = useJwt(token);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  if (decodedToken == null || isExpired) {
    navigate("/login")
  } else {
    const user_name = decodedToken.unique_name.toString()
    const user_email = decodedToken.email.toString()
    const user_id = decodedToken.id
    return (
      <nav className="fixed top-0 z-50 w-full bg-white border-b">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to={'/'} className="flex md:mr-24">
                <img
                  src="../public/img/LOGO_SENA.jpg"
                  className="h-12  mr-3"
                  alt="SENA Logo"
                />
                <img
                  src="../public/img/LOGO_SENAONPRINTING.jpg"
                  className="h-12 mr-3"
                  alt="SENA Logo"
                />
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                
                <div className="ml-2">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user_email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
