import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // or any back icon

const BackButton = ({ customClass = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center space-x-1 text-[#000] hover:text-[#252526] ${customClass}`}
    >
      <ArrowLeft size={18} />
      {/* <span>Back</span> */}
    </button>
  );
};

export default BackButton;
