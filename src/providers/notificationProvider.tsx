import { NotificationProvider } from "@refinedev/core"; // , OpenNotificationParams
import { App, notification as staticNotification } from "antd";
import { UndoableNotification } from "@/components/UndoableNotification";

// export const notificationProvider: NotificationProvider = {
//   open: ({
//     key,
//     message,
//     description,
//     type,
//     cancelMutation,
//     undoableTimeout,
//     // CUSTOM
//     duration = 4.5,
//     placement = "bottomLeft",
//     btn,
//     closeIcon,
//     onClose,
//   }: any) => {
//     // Don't show notification if request abort / cancel
//     //  || description === 'canceled'
//     if(description === 'AbortError'){ //  && type === 'error'
//       return;
//     }
    
//     if (type === "progress") {
//       staticNotification.open({
//         key,
//         description: (
//           <UndoableNotification
//             notificationKey={key}
//             message={message}
//             cancelMutation={() => {
//               cancelMutation?.();
//               staticNotification.destroy(key ?? "");
//             }}
//             undoableTimeout={undoableTimeout}
//           />
//         ),
//         message: null,
//         duration: 0,
//         closeIcon: null, // <></>,
//         placement,
//       });
//     } 
//     else {
//       staticNotification.open({
//         key,
//         /** @DEV : Find other solution */
//         description: typeof message === 'string' ? message.split('&#x2F;')[0].replaceAll('-', ' ') : message,
//         message: description ?? null,
//         type,
//         /** @CUSTOM */
//         duration,
//         placement,
//         btn,
//         closeIcon,
//         onClose,
//       });
//     }
//   },
//   close: (key: any) => staticNotification.destroy(key),
// };

// type OpenNotifCustomParams = {
//   duration?: number;
//   placement?: string; // top topLeft topRight bottom bottomLeft bottomRight
//   btn?: any;
//   closeIcon?: boolean | null;
//   onClose?: any; // function
// }

//  extends OpenNotificationParams
// interface OpenNotifCustomParams {
//   key?: string | undefined;
//   message: string;
//   type: "success" | "error" | "info" | "warning" | "progress";
//   description?: string | undefined;
//   cancelMutation?: (() => void) | undefined;
//   undoableTimeout?: number | undefined;
//   duration?: number;
//   placement?: string; // top topLeft topRight bottom bottomLeft bottomRight
//   btn?: any;
//   closeIcon?: boolean | null;
//   onClose?: any; // function
// }

// interface NotifProvider {
//   open: (params: OpenNotifCustomParams) => void;
//   close: (key: string) => void;
// }

export const useNotificationProvider = (): NotificationProvider => {
  const { notification: notificationFromContext } = App.useApp();
  const notification = "open" in notificationFromContext ? notificationFromContext : staticNotification; 

  const notificationProvider: NotificationProvider = {
    open: ({
      key,
      message,
      description,
      type,
      cancelMutation,
      undoableTimeout,
      // CUSTOM
      duration = 4.5,
      placement = "bottomLeft",
      btn,
      closeIcon,
      onClose,
    }: any) => {
      // Don't show notification if request abort / cancel
      // error.name === 'AbortError' || error.message === 'canceled'
      if (description === 'AbortError') { //  && type === 'error'
        return;
      }
      
      if (type === "progress") {
        notification.open({
          key,
          description: (
            <UndoableNotification
              notificationKey={key}
              message={message}
              cancelMutation={() => {
                cancelMutation?.();
                notification.destroy(key ?? "");
              }}
              undoableTimeout={undoableTimeout}
            />
          ),
          message: null,
          duration: 0,
          closeIcon: <></>,
          placement,
        });
      }
      else {
        notification.open({
          key,
          // description: message,
          /** @DEV : Find other solution */
          description: typeof message === 'string' ? message.split('&#x2F;')[0].replaceAll('-', ' ') : message,
          message: description ?? null,
          type,
          /** @CUSTOM */
          duration,
          btn,
          closeIcon,
          onClose,
          placement,
        });
      }
    },
    close: (key: any) => notification.destroy(key),
  };

  return notificationProvider;
}
