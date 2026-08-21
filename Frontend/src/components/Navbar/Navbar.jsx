import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiBookAura } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/Index";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const user = useSelector((state) => state.user);

  const savedName =
    sessionStorage.getItem("name") ||
    sessionStorage.getItem("userName") ||
    "";

  const userName =
    (typeof user?.username === "string" ? user.username : "") ||
    (typeof user?.name === "string" ? user.name : "") ||
    savedName ||
    "User";

  const getInitials = (name) => {
    const cleanName = String(name || "").trim();

    if (!cleanName) return "U";

    const words = cleanName.split(/\s+/).filter(Boolean);

    if (words.length === 0) return "U";

    const initials = words.slice(0, 2).map((word) => word[0]);

    return initials.join("").toUpperCase();
  };

  const initials = getInitials(userName);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const logout = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("user");

    dispatch(authActions.logout());

    setProfileOpen(false);
    setMenuOpen(false);

    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-3xl font-semibold text-orange-800 flex items-center gap-3"
          >
            <GiBookAura />
            todo
          </Link>

          <div className="hidden md:flex items-center space-x-6">

            <Link
              to="/"
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              About Us
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Sign Up
                </Link>

                <Link
                  to="/signin"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium"
                >
                  Sign In
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  to="/todo"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium"
                >
                  Todo
                </Link>

                <div
                  ref={profileRef}
                  className="relative"
                >
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 rounded-full border border-blue-200 bg-white px-2 py-1.5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
                  >
                    <span className="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-sm">
                      {initials}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {userName || "User"}
                    </span>
                    <span className="text-xs text-gray-500">▼</span>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2">
                      <div className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100 mb-1">
                        {userName || "User"}
                      </div>

                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div
            ref={menuRef}
            className="md:hidden relative"
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-52 bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-3">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="text-blue-600"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="text-blue-600"
                >
                  About Us
                </Link>

                {!isLoggedIn && (
                  <>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/signin"
                      onClick={closeMenu}
                      className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg"
                    >
                      Sign In
                    </Link>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <Link
                      to="/todo"
                      onClick={closeMenu}
                      className="text-blue-600"
                    >
                      Todo
                    </Link>

                    <div className="flex items-center gap-3 border-t pt-3">

                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center">
                        {initials}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {userName || "User"}
                        </p>

                        <button
                          onClick={logout}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Logout
                        </button>
                      </div>

                    </div>
                  </>
                )}

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;