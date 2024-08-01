import type { IOrder } from '@/types/Types';
import { useDocumentTitle } from "@refinedev/react-router-v6";
import { HttpError, useParsed, useOne } from "@refinedev/core";
import { Breadcrumb, Card } from 'antd';
import { Link } from "react-router-dom";
import { ButtonReload } from '@/components/ButtonReload';
import { Forms } from './parts/Forms';

export default function Show(){
  const title = "Order details";

  useDocumentTitle(title + " • " + import.meta.env.VITE_APP_NAME);

  const { id } = useParsed<any>();

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
    // isError,
    refetch,
  } = useOne<IOrder, HttpError>({
    resource: "carts",
    id,
  });

  const loadingDetails = isLoading || isFetching || isRefetching;

  return (
    <>
      <Breadcrumb
        items={[
          { title: <Link to="/orders">Orders</Link> },
          { title },
        ]}
        className="mb-2"
      />

      <Card>
        <Forms
          values={data || {}}
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
