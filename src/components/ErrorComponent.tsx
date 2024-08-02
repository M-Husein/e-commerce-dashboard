import { RefineErrorPageProps } from "@refinedev/ui-types";
import { useEffect } from "react";
import { useNavigation } from "@refinedev/core";
import { Button, Result } from "antd";

/**
 * When the app is navigated to a non-existent route, refine shows a default error page.
 * A custom error component can be used for this error page.
 *
 * @see {@link https://refine.dev/docs/packages/documentation/routers/} for more details.
 */
export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const { push } = useNavigation();

  useEffect(() => {
    const loader = document.getElementById('loaderApp');
    if(loader) loader.hidden = true;
  }, []);

  const backTo = () => {
    let path = "/";
    
    if(window.location.pathname.startsWith('/admin')){
      path += "admin";
    }

    // if(user?.name === 'system'){
    //   path += "admin";
    // }

    push(path);
  }

  return (
    <Result
      status="404"
      title="404"
      extra={
        <div>
          <p>Sorry, the page you visited does not exist.</p>

          {/* Not render when in home page */}
          {!['/', '/admin'].includes(window.location.pathname) && (
            <Button
              type="primary"
              onClick={backTo}
            >
              Back to Home
            </Button>
          )}
        </div>
      }
    />
  );
}
