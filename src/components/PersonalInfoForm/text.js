import { FormattedMessage } from "react-intl";

export const CompanyNameLabelText = (
  <FormattedMessage id="companyNameLabel" defaultMessage="Organisation name" />
);

export const CompanyNameHelperText = (
  <FormattedMessage
    id="companyNameHelper"
    defaultMessage="Please enter the name of the organisation you would like to contact." 
  />
);

export const CompanyEmailLabelText = (
  <FormattedMessage
    id="companyEmailLabel"
    defaultMessage="Organisation email address"
  />
);

export const CompanyEmailHelperText = (
  <FormattedMessage
    id="compnayEmailHelper"
    defaultMessage="Please enter the email address of the person or department responsible for handling GDPR / privacy / legal requests."
  />
);

export const NameLabelText = (
  <FormattedMessage id="nameLabel" defaultMessage="Your full name" />
);

export const NameHelperText = (
  <FormattedMessage
    id="nameHelper"
    defaultMessage="This will be used by the organisation to identify you in their systems."
  />
);

export const IdentifyingInfoLabelText = (
  <FormattedMessage id="identifyingInfoLabel" defaultMessage="Additional identifying information" />
);

export const IdentifyingInfoHelperText = (
  <FormattedMessage
    id="IdentifyingInfoHelper"
    defaultMessage="Optionally provide any additional information which may help the organisation to identify you in their information systems such as Username, Customer ID or Account Number."
  />
);

export const SubmitButtonText = (
  <FormattedMessage id="sendButton" defaultMessage="Send your request" />
);
