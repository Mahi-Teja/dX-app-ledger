export const Tags = ({ title, close }) => {
  return (
    <div className="bg-gray-100 rounded p-1 mx-0.5 w-fit flex">
      {title}
      <button onClick={(e) => close(e)} className="px-1">
        x
      </button>
    </div>
  );
};
