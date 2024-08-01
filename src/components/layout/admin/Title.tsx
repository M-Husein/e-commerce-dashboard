import { Link } from "react-router-dom";

export const Title: React.FC<any> = ({
  collapsed,
  icon,
  text,
}) => {
  return (
    <Link
      to="/"
      className="inline-flex txt-main"
    >
      {icon}

      <b 
        className="ml-2 text-base"
        hidden={collapsed}
        translate="no"
      >
        {text}
      </b>
    </Link>
  );
};
