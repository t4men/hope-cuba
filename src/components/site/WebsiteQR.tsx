import asset from "@/assets/website-qr.jpeg.asset.json";
import { siteUrl } from "@/app/organization-status";
import { useT } from "@/i18n";

export function WebsiteQR() {
  const t = useT();
  return <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-3">
    <img src={asset.url} alt={t.share.qrAlt} width={88} height={88} loading="lazy" className="h-22 w-22 shrink-0 rounded-md object-contain" />
    <span className="min-w-0 text-sm"><span className="block font-bold">{t.share.qrTitle}</span><span className="break-all">www.hope-cuba.org</span></span>
  </a>;
}