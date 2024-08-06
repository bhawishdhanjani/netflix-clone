import React from "react";

interface NavbarItemProps {
  label: string;
}

const Navbaritem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition">
      {label}
    </div>
  );
};

export default Navbaritem;
