import type { IUser } from '@/types/Types';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useParsed, useOne } from "@refinedev/core";
import { Breadcrumb, Card, Avatar } from 'antd';
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { ButtonReload } from '@/components/ButtonReload';
import { Forms } from './parts/Forms';

export default function Show(){
  const title = "User details";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  const { id } = useParsed<any>();

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    refetch,
  } = useOne<IUser, HttpError>({
    resource: "users",
    id,
  });

  const loadingDetails = isLoading || isFetching || isRefetching;
  // @ts-ignore
  const { avatar, image, firstName, lastName, username } = data || {};
  const displayUserName = [firstName, lastName].filter(Boolean).join(' ') || username;

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
              alt={displayUserName}
              size={150}
              icon={<FaRegUser />}
              src={avatar || image}
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
