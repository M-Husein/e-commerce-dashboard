import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import type { IUser } from '@/types/Types';
import { useEffect } from "react";
import { useGetIdentity, useLogout, useWarnAboutChange, useTranslate } from "@refinedev/core";
import {
  Avatar,
  Layout as AntdLayout,
  Dropdown,
  Button,
  Modal,
  Switch,
} from "antd";
import { FaRegUser } from "react-icons/fa";
import { useLocation, NavLink } from "react-router-dom";
import { useApp } from "@/contexts/app/AppContext";
import { LanguageMenu } from '@/components/LanguageMenu';

const overlayStyle = {
  left: 'auto',
  right: 0
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { firstName, lastName, username, email, avatar, image } = user || {};

  const { theme, setTheme } = useApp();
  const translate = useTranslate();
  const location = useLocation();
  const { mutate: mutateLogout } = useLogout();
  const { warnWhen, setWarnWhen } = useWarnAboutChange();
  const [modalApi, modalContextHolder] = Modal.useModal();

  const displayUserName = [firstName, lastName].filter(Boolean).join(' ') || username;

  const doLogout = () => {
    if (warnWhen) {
      if (window.confirm(translate("warnWhenUnsavedChanges"))) {
        setWarnWhen(false);
        mutateLogout();
      }
    } else {
      mutateLogout();
    }
  }

  useEffect(() => {
    const onMessage = (e: any) => {
      if(e.data.type === "LOGOUT"){
        sessionStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
        
        modalApi.warning({
          centered: true,
          keyboard: false,
          title: "Ups",
          content: "Anda logged out dari tab/jendela lain",
          okText: "Login",
          okButtonProps: { onClick: () => window.location.replace('/login') },
        });
      }
    }

    const bc = new BroadcastChannel(import.meta.env.VITE_BC_NAME);

    bc.addEventListener('message', onMessage);

    return () => {
      bc.removeEventListener('message', onMessage);
    }
  }, []);

  return (
    <AntdLayout.Header
      style={{ padding: '0 14px' }}
      // bg-blue-100 | bg-main
      className="bg-nav !sticky h-12 flex items-center top-0 z-1051 shadow"
      id="navMain"
    >
      <div className="relative h-12 ml-auto flex items-center">
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
          defaultChecked={theme === "dark"}
        />
        
        <div className="relative mx-3">
          <LanguageMenu
            overlayStyle={{
              left: 'auto',
              right: 0
            }}
          />
        </div>

        <Dropdown
          getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
          overlayStyle={overlayStyle}
          trigger={['click']}
          placement="bottomRight"
          menu={{
            selectable: true,
            selectedKeys: [location.pathname],
            items: [
              {
                key: "/profile",
                label: (
                  <NavLink 
                    to="/profile"
                    className="flex items-center justify-center"
                  >
                    <Avatar
                      className="flex-none"
                      size={55}
                      icon={<FaRegUser />}
                      src={avatar || image}
                      alt={displayUserName}
                    />
                    <section className="w-48 ml-3">
                      {!!displayUserName && (
                        <h1 className="text-lg mb-0 leading-6">
                          {displayUserName}
                        </h1>
                      )}
                      
                      {email && (
                        <div className="text-sm text-gray-500 font-normal truncate">
                          {email}
                        </div>
                      )}
                    </section>
                  </NavLink>
                )
              },
              {
                type: "divider"
              },
              {
                key: 2,
                label: "Logout",
                onClick: doLogout
              }
            ],
          }}
        >
          <Button shape="circle" className="!p-0">
            <Avatar
              size={30}
              icon={<FaRegUser />}
              src={avatar || image}
              alt={displayUserName}
              style={{ display: 'flex' }}
            />
          </Button>
        </Dropdown>
      </div>

      {modalContextHolder}
    </AntdLayout.Header>
  );
};
