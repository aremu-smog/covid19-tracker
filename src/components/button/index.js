import ctl from "@netlify/classnames-template-literals";

const Button = ({ text, className }) => {
  const buttonStyle = ctl(`px-8 py-2 rounded border border-white m-2`);

  return <button className={buttonStyle}>{text}</button>;
};

export default Button;
