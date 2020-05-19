import { notification } from "antd";

const checkError = (error) => {
  notification.config({
    placement: "topRight",
  });
  try {
    switch (typeof error) {
      case "object": {
        if (Array.isArray(error)) {
          error.map((a) =>
            notification.error({
              message: a,
            })
          );
        } else {
          notification.error({
            message: error.message,
          });
        }
        break;
      }
      case "string": {
        notification.error({
          message: error,
        });
        break;
      }
      default: {
        error.map((a) =>
          notification.error({
            message: a,
          })
        );
      }
    }
  } catch (error) {
    notification.error({
      message: "Server Error !" ,
    })
  }
  
};

export default checkError;
