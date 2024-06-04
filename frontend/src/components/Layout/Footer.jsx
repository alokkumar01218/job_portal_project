import React, { useContext } from "react";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Context } from "../../main.jsx";
import { Link } from "react-router-dom";

export default function Footer() {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reseved by ZobZee.</div>
      <div>
        <Link to={"#"}>
          <FaFacebookF />
        </Link>
        <Link to={"#"}>
          <FaYoutube />
        </Link>
        <Link to={"#"}>
          <FaLinkedin />
        </Link>
        <Link to={"#"}>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
}
