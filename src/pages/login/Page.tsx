import { HttpError, useTranslate, useActiveAuthProvider, useLogin } from "@refinedev/core";
import { Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from 'react-hook-form';
import { Layout } from '@/components/layout/auth/Layout';
import { Form } from '@/components/forms/Form';

type IFormValues = {
  username: string;
  password: string;
  remember: boolean;
  providerName?: string;
}

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export default function Page(){
  const translate = useTranslate();
  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin<any>({ 
    v3LegacyAuthProviderCompatible: !!authProvider?.isLegacy 
  });

  const {
    formState: { errors },
    control,
    handleSubmit, 
  } = useForm<IFormValues, HttpError, IFormValues>();

  const disabledLink = (cls?: string) => ({
    tabIndex: isLoading ? -1 : 0,
    className: (isLoading ? "pe-none opacity-65 " : "") + "focus-visible_ring " + cls,
  });

  const doLogin = (values: any) => {
    login({
      ...values,
      username: values.username.trim()
    });
  }

  return (
    <Layout
      title="Login"
      form={
        <Form
          disabled={isLoading}
          onSubmit={handleSubmit(doLogin)}
          fieldsetClass="space-y-6"
        >
          <div>
            <label htmlFor="eml">{translate("pages.login.fields.username")}</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  status={errors.username ? "error" : ""}
                  disabled={isLoading}
                  id="eml"
                  className="mt-1"
                  spellCheck={false}
                  autoCorrect="off"
                  autoCapitalize="off"
                  size="large"
                />
              )}
              rules={{
                required: true
              }}
            />
            {errors.username && (
              <div className="mt-1 text-red-700 text-xs">
                {translate("error.required")}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="pwd">{translate("pages.login.fields.password")}</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  status={errors.password ? "error" : ""}
                  disabled={isLoading}
                  id="pwd"
                  className="mt-1"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  size="large"
                />
              )}
              rules={{
                required: true,
                minLength: {
                  value: 6,
                  message: translate("error.minLength", { v: 6 })
                },
              }}
            />
            {errors.password && (
              <div className="mt-1 text-red-700 text-xs">
                {errors.password.message || translate("error.required")}
              </div>
            )}
          </div>

          <div className="flex flex-wrap">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <Checkbox 
                  {...field} 
                  checked={field.value}
                  disabled={isLoading}
                  className="mr-2"
                >
                  {translate("pages.login.buttons.rememberMe")}
                </Checkbox>
              )}
            />

            <Link 
              to="/forgot-password" 
              {...disabledLink("text-gray-600 ml-auto")}
            >
              {translate("pages.login.buttons.forgotPassword")}
            </Link>
          </div>

          <Button
            block
            type="primary"
            size="large"
            htmlType="submit"
            loading={isLoading}
          >
            {translate("pages.login.signin")}
          </Button>
          
          <p className="text-center border-t pt-4">
            {translate('pages.login.buttons.noAccount')}
            {' '}
            <Link 
              to="/register" 
              {...disabledLink("font-bold")}
            >
              {translate("pages.login.signup")}
            </Link>
          </p>
        </Form>
      }
    />
  );
}
