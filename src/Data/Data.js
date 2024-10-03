// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare } from "@iconscout/react-unicons";
import { MdOutlineWaterDrop } from "react-icons/md";
import { SlFire } from "react-icons/sl";
import { WiSmoke } from "react-icons/wi";

import { keyboard } from "@testing-library/user-event/dist/keyboard";
import doam from '../imgs/doam.jpg'
import fire from '../imgs/fire.jpg'
import gas from '../imgs/gas.jpg'

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Trang chính",
  },
  {
    icon: UilClipboardAlt,
    heading: "Trực tiếp",
  },
  {
    icon: UilUsdSquare,
    heading: "Thiết bị",
  },
  {
    icon: UilUsersAlt,
    heading: "Tài khoản",
  }
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Độ ẩm",
    color: {
      backgroundImage: `url(${doam})`,
      boxShadow: "0px 10px 20px 0px #34cc3d",
    },
    barValue: 30,
    value: "86%",
    png: MdOutlineWaterDrop,
    series: [
      {
        name: "Humidity",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Nhiệt độ",
    color: {
      // backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      backgroundImage: `url(${fire})`,
      boxShadow: "0px 10px 20px 0px #ca737d",
    },
    barValue: 20,
    value: "36ºC",
    png: SlFire,
    series: [
      {
        name: "Temp",
        data: [10, 0, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Khí gas",
    color: {
      // backGround:
      //   "linear-gradient(180deg, rgba(47,156,184,1) 0%, rgba(47,154,169,1) 32%, rgba(47,154,169,1) 93%)",
      backgroundImage: `url(${gas})`,
      boxShadow: "0px 10px 20px 0px #111111",
    },
    barValue: 50,
    value: "34 %",
    png: WiSmoke,
    series: [
      {
        name: "gas",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

