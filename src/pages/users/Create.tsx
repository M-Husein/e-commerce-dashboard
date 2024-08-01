import { useDocumentTitle } from "@refinedev/react-router-v6";
// import { HttpError, useParsed, useTranslate, useOne } from "@refinedev/core";
import { Breadcrumb, Card, Avatar } from 'antd';
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { Forms } from './parts/Forms';

export default function Create(){
  const title = "Create user";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/users">Users</Link> },
          { title },
        ]}
        className="mb-2"
      />

      <Card
        classNames={{
          body: "flex flex-wrap"
        }}
      >
        <Card.Meta
          className="flex-none self-start !sticky md_top-16 z-1"
          avatar={
            <Avatar
              alt="PP"
              size={150}
              icon={<FaRegUser />}
              // src={avatar || image}
            />
          }
        />

        <Forms />
      </Card>
    </>
  );
}
