import "./AddPostButton.css";

const SecondButton = ({ funcioncita }) => {
  return (
    <div className="button-container">
      <button className="Btn" onClick={funcioncita}>
        Generar post
      </button>
    </div>
  );
};

export default SecondButton;
