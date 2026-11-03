// Central legal / launch switches. Only change these values (and verified master data)
// once registration, tax recognition and payment approvals are confirmed.
export const organizationStatus = {
  isRegistered: false,
  taxRecognitionConfirmed: false,
  donationsEnabled: false,
  paymentProviderApprovedForCuba: false,
  contactFormEnabled: false,
  registeredName: "Hope Cuba e.V.",
  preRegistrationName: "Hope Cuba – Initiative in Gründung",
  registryCourt: "",
  registryNumber: "",
  taxNoticeDate: "",
  officialDonationUrl: "",
  bankIban: "",
  bankBic: "",
  btcAddress: "",
  bitcoinSilentPaymentAddress: "",
};

export const contactData = {
  street: "Markstr. 27",
  city: "64409 Messel",
  phoneDisplay: "+49 6159 9199799",
  phoneHref: "tel:+4961599199799",
  // Address as printed in the statute draft v1.4.
  email: "hope-cuba@outlook.com",
};

export const socialLinks = {
  facebook: "",
  instagram: "",
  tiktok: "",
  x: "",
};

export const publicName = () =>
  organizationStatus.isRegistered
    ? organizationStatus.registeredName
    : organizationStatus.preRegistrationName;
