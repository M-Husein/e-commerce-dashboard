import { useDocumentTitle } from "@refinedev/react-router-v6";
import { Breadcrumb, Card, Avatar } from 'antd';
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import { Forms } from './parts/Forms';

export default function Create(){
  const title = "Create product";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/products">Products</Link> },
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
              icon={<FaImage />}
              shape="square"
            />
          }
        />

        <Forms />
      </Card>
    </>
  );
}
