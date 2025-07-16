import { FaShoppingBag } from "react-icons/fa";
import { GiHealthNormal } from "react-icons/gi";
import { IoWalletOutline } from "react-icons/io5";
import {
  MdDirectionsTransit,
  MdFilterAlt,
  MdFilterAltOff,
} from "react-icons/md";
import { BsBank } from "react-icons/bs";
import { MdOutlineFastfood } from "react-icons/md";
import { FaMasksTheater } from "react-icons/fa6";
import { RiMovieAiFill } from "react-icons/ri";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { Fa42Group } from "react-icons/fa6";
import { IoMdCash } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { RiFunctionAddLine } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import { BiDollar } from "react-icons/bi";
import { IoMdMore } from "react-icons/io";
import { IoIosMore } from "react-icons/io";
import { GrAnalytics } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import { BsArrowRepeat } from "react-icons/bs";

// arrows
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

const CategoryIcons = {
  movies: <RiMovieAiFill />,
  shopping: <FaShoppingBag />,
  food: <MdOutlineFastfood />,
  health: <GiHealthNormal />,
  utilities: <Fa42Group />,
  salary: <IoMdCash />,
  train: <MdDirectionsTransit />,
  transport: <MdDirectionsTransit />,
  theaterMask: <FaMasksTheater />,
  entertainment: <FaMasksTheater />,
  bank: <BsBank />,
  wallet: <IoWalletOutline />,
  card: <FaRegCreditCard />,
  calendar: <FaCalendarAlt />,
  self: <BsArrowRepeat />,
  fuel: <BsFillFuelPumpFill />,
};
const FreeIcons = {
  edit: <MdModeEdit />,
  verticalThreeDots: <IoMdMore />,
  horixzontalThreeDots: <IoIosMore />,
  delete: <MdDelete />,
  close1: <IoClose />,
  addCategory: <RiFunctionAddLine />,
  add: <RiAddLargeFill />,
  inr: <MdCurrencyRupee />,
  usd: <BiDollar />,
  filteropen: <MdFilterAltOff />,
  filterClosed: <MdFilterAlt />,
};
const AccountIcons = {
  cash: <IoMdCash />,
  "credit card": <FaRegCreditCard />,
  savings: <LiaPiggyBankSolid />,
  wallet: <IoWalletOutline />,
};
const ArrowIcons = {
  left: <FaArrowLeftLong />,
  right: <FaArrowRight />,
  leftAngle: <MdOutlineArrowBackIos />,
  rightAngle: <MdOutlineArrowForwardIos />,
  leftDoubleAngle: <MdKeyboardDoubleArrowLeft />,
  rightDoubleAngle: <MdKeyboardDoubleArrowRight />,
  incArrow: <FaArrowTrendUp />,
  decArrow: <FaArrowTrendDown />,
};

const NavIcons = {
  Home: <GoHomeFill />,
  Profile: <FaUser />,
  Transactions: <FaHistory />,
  Categories: <MdOutlineCategory />,
  Budgets: <TbMoneybag />,
  Reports: <GrAnalytics />,
  Accounts: <LiaPiggyBankSolid />,
};

export { CategoryIcons, NavIcons, AccountIcons, FreeIcons, ArrowIcons };
