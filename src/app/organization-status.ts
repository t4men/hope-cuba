// Central legal / launch / payment switches. Only change these values (and verified master data)
// once registration, tax recognition and payment approvals are confirmed. See README "Freischaltung".

export type LegalStatus =
  | "initiative_pre_foundation" // no association founded yet
  | "association_unregistered" // founded, not yet registered
  | "registered_not_tax_approved"
  | "tax_approved";

export const organization = {
  legalStatus: "initiative_pre_foundation" as LegalStatus,
  publicShortName: "Hope Cuba",
  /** Exact legal recipient of funds. Before foundation: Christof Kluska as private fundraiser. */
  officialRecipientName: "",
  registeredNumber: "",
  taxRecognitionConfirmed: false,
  donationReceiptAuthorized: false,
};

export const campaign = {
  startDate: "2026-11-04",
  endDate: "2026-12-03",
  minimumGoalEUR: 2000,
  stretchGoalEUR: 5000,
  verifiedReceivedEUR: null as number | null, // never invent
  lastVerifiedAt: null as string | null,
};

export const payment = {
  bank: { enabled: false, verified: false, owner: "", iban: "", bic: "", reference: "Hope Cuba – Nothilfe Holguín" },
  bitcoin: {
    enabled: false, // true only after recipient assignment and test receipt
    verified: false,
    ownerDescription: "",
    address: "bc1qdcknh849yme4msnnq3rrqh90xm4w6rjce60rjy",
  },
  silentPayments: { enabled: false, verified: false, address: "" },
  crowdfunding: [
    { id: "goodcrowd", title: "GoodCrowd", infoUrl: "https://www.goodcrowd.org/", campaignUrl: "", approved: false },
    { id: "gofundme", title: "GoFundMe", infoUrl: "https://www.gofundme.com/de-de", campaignUrl: "", approved: false },
    { id: "betterplace", title: "betterplace.org", infoUrl: "https://www.betterplace.org/", campaignUrl: "", approved: false },
  ],
};

export const isRegistered = () =>
  organization.legalStatus === "registered_not_tax_approved" || organization.legalStatus === "tax_approved";

export const bankLive = (bank = payment.bank, recipient = organization.officialRecipientName) =>
  bank.enabled && bank.verified && !!bank.iban && !!bank.owner && !!recipient;
export const bitcoinLive = (bitcoin = payment.bitcoin, recipient = organization.officialRecipientName) =>
  bitcoin.enabled && bitcoin.verified && !!bitcoin.address && !!bitcoin.ownerDescription && !!recipient;
export const silentLive = (silent = payment.silentPayments, recipient = organization.officialRecipientName) =>
  silent.enabled && silent.verified && !!silent.address && !!recipient;
export const liveCampaigns = (campaigns = payment.crowdfunding, recipient = organization.officialRecipientName) =>
  campaigns.filter((c) => !!recipient && c.approved && /^https:\/\//.test(c.campaignUrl) && c.campaignUrl !== c.infoUrl);
export const anyPaymentLive = () => bankLive() || bitcoinLive() || silentLive() || liveCampaigns().length > 0;
export const receiptsLive = () => organization.taxRecognitionConfirmed && organization.donationReceiptAuthorized;
export const verifiedProgress = (received = campaign.verifiedReceivedEUR) =>
  received === null ? null : Math.min(100, Math.max(0, received / campaign.stretchGoalEUR * 100));

// Legacy flags used across the site, derived from the config above.
export const organizationStatus = {
  get isRegistered() { return isRegistered(); },
  get taxRecognitionConfirmed() { return organization.taxRecognitionConfirmed; },
  get donationsEnabled() { return anyPaymentLive(); },
  contactFormEnabled: false,
  registeredName: "Hope Cuba e.V.",
  preRegistrationName: "Hope Cuba – Initiative in Gründung",
  registryCourt: "",
  registryNumber: "",
};

export const contactData = {
  street: "Markstr. 27",
  city: "64409 Messel",
  phoneDisplay: "+49 6159 9199799",
  phoneHref: "tel:+4961599199799",
  email: "info@hope-cuba.org",
};

export const siteUrl = "https://www.hope-cuba.org";

export const socialLinks = { facebook: "", instagram: "", tiktok: "", x: "" };

export const publicName = () =>
  organizationStatus.isRegistered ? organizationStatus.registeredName : organizationStatus.preRegistrationName;
