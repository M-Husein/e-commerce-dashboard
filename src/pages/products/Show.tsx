import type { IProduct } from '@/types/Types';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useParsed, useOne } from "@refinedev/core";
import { Breadcrumb, Card, Avatar, Modal } from 'antd';
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import { ButtonReload } from '@/components/ButtonReload';
import { Forms } from './parts/Forms';

export default function Show(){
  const title = "Product details";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  const { id } = useParsed<any>();

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    // isError,
    refetch,
  } = useOne<IProduct, HttpError>({
    resource: "products",
    id,
  });

  const loadingDetails = isLoading || isFetching || isRefetching;
  // @ts-ignore
  const { thumbnail, images, title: titleData } = data || {};

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
              alt={titleData}
              size={150}
              icon={<FaImage />}
              shape="square"
              src={thumbnail}
            />
          }
        />

        <Forms
          values={data}
          disabled={loadingDetails}
          buttons={
            <ButtonReload
              loading={!isLoading && isRefetching}
              onClick={() => refetch()}
            />
          }
        />
      </Card>
    </>
  );
}
