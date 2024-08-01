import { HttpError, useTranslate, useForgotPassword } from "@refinedev/core";
import { Input, Button } from "antd";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Layout } from '@/components/layout/auth/Layout';
import { Form } from '@/components/forms/Form';
import { email as emailRegExp } from '@/utils/regExp'; 

type IFormValues = {
  email: string;
  username?: string;
}

export default function Page(){
  const translate = useTranslate();
  const TITLE_PAGE = translate("pages.forgotPassword.title");
  const { mutate: forgotPassword, isLoading } = useForgotPassword<IFormValues>();

  const {
    formState: { errors },
    control,
    handleSubmit, 
  } = useForm<IFormValues, HttpError, IFormValues>();

  const doSubmit = (values: any) => {
    forgotPassword(values)
  }

  return (
    <Layout
      title={TITLE_PAGE}
      form={
        <Form
          disabled={isLoading}
          onSubmit={handleSubmit(doSubmit)}
        >
          <h1 className="text-center text-lg">{TITLE_PAGE}</h1>
          <p>
            {translate("pages.forgotPassword.desc")}
          </p>

          <div>
            <label htmlFor="eml">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.email ? "error" : ""}
                  disabled={isLoading}
                  id="eml"
                  className="mt-1"
                  inputMode="email"
                  spellCheck={false}
                  autoComplete="email"
                  autoCorrect="off"
                  autoCapitalize="off"
                  size="large"
                />
              )}
              rules={{
                required: true,
                pattern: {
                  value: emailRegExp,
                  message: translate("error.invalid", { name: "Email" })
                }
              }}
            />
            {errors.email && (
              <div className="mt-1 text-red-700 text-xs">
                {errors.email.message || translate("error.required")}
              </div>
            )}
          </div>

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
            className="w-full mt-4 mb-2"
          >
            {translate("pages.forgotPassword.buttons.submit")}
          </Button>

          <div className="text-center mt-4">
            {translate("pages.register.buttons.haveAccount")}
            {' '}
            <Link
              to="/login"
              className={"focus-visible_ring font-bold" + (isLoading ? " pe-none opacity-65" : "")}
              tabIndex={isLoading ? -1 : 0}
            >
              {translate("pages.login.signin")}
            </Link>
          </div>
        </Form>
      }
    />
  );
}
