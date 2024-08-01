// import { useTranslate } from "@refinedev/core";
import { Button } from "antd";
import { ReloadOutlined } from "@ant-design/icons";

export const ButtonReload = ({
  ghost = !0,
  type = "primary",
  icon,
  title,
  ...etc
}: any) => {
  // const translate = useTranslate();

  return (
    <Button 
      {...etc}
      ghost={ghost}
      type={type}
      icon={icon || <ReloadOutlined />}
      title={title || "Reload"}
    />
  )
}
