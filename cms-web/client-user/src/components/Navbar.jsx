import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div style={{ position: "sticky", width: "100%", top: "0px", zIndex: 99 }}>
      <div className="bg-black w-full">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            gap: "32px",
          }}
          className=" flex text-white py-4 font-bold"
        >
          <img
            src="https://cdn.cnnindonesia.com/cnnid/images/logo.webp?v=10.10.5"
            alt="CNN logo"
            style={{ position: "fixed", top: 0 }}
            width="72px"
          ></img>
          <NavLink to="/" style={{ marginLeft: "120px" }}>
            Home
          </NavLink>
          <p>Nasional</p>
          <p>Internasional</p>
          <p>Ekonomi</p>
          <p>Olahraga</p>
          <p>Teknologi</p>
          <p>Otomotif</p>
          <p>Hiburan</p>
          <p>Gaya Hidup</p>
        </div>
      </div>
      <div className="bg-gray-200 w-full h-14 "> </div>
    </div>
  );
};

export default Navbar;
