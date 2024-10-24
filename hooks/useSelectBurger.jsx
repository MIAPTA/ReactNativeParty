import { useState } from "react";

function useNavbar() {
  const [menuActive, setMenuActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return { menuActive, selectedItem, toggleMenu, handleMenuItemClick };
}

export default useNavbar;
