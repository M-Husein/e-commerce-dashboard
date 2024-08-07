
import { useTranslate, useUpdate } from "@refinedev/core";
import { Row, Col, Button, Input, Card, Modal, Alert } from 'antd';
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
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
    >
      <Col lg={13} xs={24}>
        <Alert 
          type="info"
          message={
            <div className="p-2 space-y-6">
              <Row gutter={[16, 4]}>
                <Col md={6} xs={24}>
                  Total
                </Col>
                <Col md={18} xs={24}>
                  <Input
                    readOnly
                    value={values.total}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 4]}>
                <Col md={6} xs={24}>
                  Total Products
                </Col>
                <Col md={18} xs={24}>
                  <Input
                    readOnly
                    value={values.totalProducts}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 4]}>
                <Col md={6} xs={24}>
                  Discounted Total
                </Col>
                <Col md={18} xs={24}>
                  <Input
                    readOnly
                    value={values.discountedTotal}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 4]}>
                <Col md={6} xs={24}>
                  Total Qty
                </Col>
                <Col md={18} xs={24}>
                  <Input
                    readOnly
                    value={values.totalQuantity}
                  />
                </Col>
              </Row>

              <Row gutter={[16, 4]}>
                <Col md={6} xs={24}>
                  User
                </Col>
                <Col md={18} xs={24}>
                  <Link 
                    to={"/users/" + values.userId} 
                    className="font-medium"
                  >
                    <FaRegUser /> Show
                  </Link>
                </Col>
              </Row>
            </div>
          }
        />
      </Col>

      <div className="my-4">
        <h2 className="mb-2 text-lg">Products</h2>

        <Row gutter={[16, 16]}>
          {(disabled ? [1, 2, 3] : values.products || []).map((item: IOrder['products'], index: number) =>
            <Col key={item.id || index} lg={4} md={6} xs={24}>
              <Card
                size="small"
                loading={disabled}
                className="shadow h-full"
                cover={
                  !disabled && (
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
                        style={{ minHeight: 95 }}
                      />
                    </Link>
                  )
                }
              >
                {!disabled && (
                  <Card.Meta 
                    title={
                      <Link 
                        to={"/products/" + item.id} 
                        className="text-gray-700"
                        title={item.title}
                      >
                        {item.title}
                      </Link>
                    }
                    description={
                      <table className="text-sm">
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
                )}
                
              </Card>
            </Col>
          )}
        </Row>
      </div>

      <div className="text-center space-x-2 mt-6">
        {buttons}

        <Button
          type="primary"
          loading={isLoading}
          disabled={disabled}
          onClick={updateOrder}
        >
          Update
        </Button>
      </div>

      {modalContextHolder}
    </fieldset>
  );
}
