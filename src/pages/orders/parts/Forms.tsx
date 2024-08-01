
import { useTranslate, useUpdate } from "@refinedev/core"; // useNavigation
import { Row, Col, Button, Input, Card, Modal } from 'antd';
import { Link } from "react-router-dom";
// import dayjs from 'dayjs';
import type { IOrder } from '@/types/Types';

export function Forms({
  values,
  disabled,
  buttons,
}: any){
  const translate = useTranslate();
  const { mutate: mutateUpdate, isLoading } = useUpdate();
  const [modalApi, modalContextHolder] = Modal.useModal();

  const updateOrder = () => {
    const modalConfirm = modalApi.confirm({
      keyboard: false,
      centered: true,
      title: translate('confirms.ensure', { name: 'update' }),
      cancelButtonProps: { disabled: false },
      onOk: () => new Promise((resolve, reject) => {
        const updateConfirm = (disabled: boolean) => {
          modalConfirm.update({
            cancelButtonProps: { disabled }
          })
        }

        updateConfirm(true);

        mutateUpdate({
          resource: "carts",
          id: values.id,
          values: {
            ...values,
            merge: true,
          }
        }, {
          onError: (e) => {
            updateConfirm(false)
            reject(e)
          },
          onSuccess: resolve,
        });    
      })
    });
  }

  return (
    <fieldset
      disabled={disabled}
      className="space-y-6"
    >
      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          Total
        </Col>
        <Col md={19} xs={24}>
          <Input
            readOnly
            value={values.total}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          Total Products
        </Col>
        <Col md={19} xs={24}>
          <Input
            readOnly
            value={values.totalProducts}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          Discounted Total
        </Col>
        <Col md={19} xs={24}>
          <Input
            readOnly
            value={values.discountedTotal}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          Total Qty
        </Col>
        <Col md={19} xs={24}>
          <Input
            readOnly
            value={values.totalQuantity}
          />
        </Col>
      </Row>

      <Row gutter={[16, 4]}>
        <Col md={5} xs={24}>
          User
        </Col>
        <Col md={19} xs={24}>
          <Input
            readOnly
            value={values.userId}
          />
        </Col>
      </Row>

      {Array.isArray(values?.products) && (
        <div>
          <p className="mb-2">Products</p>

          <Row gutter={[16, 16]}>
            {values.products.map((item: IOrder['products']) =>
              <Col key={item.id} lg={6} md={8} xs={24}>
                <Card
                  size="small"
                  className="shadow"
                  cover={
                    <Link 
                      to={"/products/" + item.id} 
                      className="overflow-hidden"
                    >
                      <img 
                        loading="lazy"
                        decoding="async"
                        className="block w-full"
                        alt={item.title} 
                        src={item.thumbnail}
                      />
                    </Link>
                  }
                >
                  <Card.Meta 
                    title={
                      <Link 
                        to={"/products/" + item.id} 
                        className="text-gray-700"
                      >
                        {item.title}
                      </Link>
                    }
                    description={
                      <table>
                        <tbody>
                          {[
                            { label: "Price", value: item.price },
                            { label: "Quantity", value: item.quantity },
                            { label: "Discount", value: item.discountPercentage },
                            { label: "Discounted Total", value: item.discountedTotal },
                          ].map((tr: any) => 
                            <tr key={tr.label}>
                              <td>{tr.label}</td>
                              <td className="px-1">:</td>
                              <td>{tr.value}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    }
                  />
                </Card>
              </Col>
            )}
          </Row>
        </div>
      )}

      <div className="text-center space-x-2">
        {buttons}

        <Button
          type="primary"
          loading={isLoading}
          onClick={updateOrder}
        >
          {translate('buttons.save')}
        </Button>
      </div>

      {modalContextHolder}
    </fieldset>
  );
}
