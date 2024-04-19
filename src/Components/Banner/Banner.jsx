import React, { useState } from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow';

function Banner() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu" onClick={toggleDropdown}>
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcycles</span>
            <span>Mobile Phones</span>
            <span>For Sale: Houses & Apartments</span>
            <span>Scooters</span>
            <span>Commercial & Other Vehicles</span>
            <span>For Rent: Houses & Apartments</span>
          </div>
          {isOpen && (
            <div className="dropdownMenu">
              <span>Cars</span>
              <span>Motorcycles</span>
              <span>Mobile Phones</span>
              <span>For Sale: Houses & Apartments</span>
              <span>Scooters</span>
              <span>Commercial & Other Vehicles</span>
              <span>For Rent: Houses & Apartments</span>
            </div>
          )}
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
