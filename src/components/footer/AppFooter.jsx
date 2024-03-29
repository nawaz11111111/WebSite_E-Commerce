import Typography from "antd/es/typography/Typography";
import React from "react";

function AppFooter() {
  return (
    <div className="appFooter">
      <Typography.Link href="https :// www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https ://www.google.com" target={"_blank"}>
        Terms & Conditions
      </Typography.Link>
      <Typography.Link href="https ://www.google.com" target={"_blank"}>
        Return Policy
      </Typography.Link>
      <Typography.Link href="tel : +123456789" target={"_blank"}>
        +92 111111111
      </Typography.Link>
    </div>
  );
}

export default AppFooter;
