import { WHATSAPP_NUMBER, SITE } from '../config';

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function productMessage(name: string, url: string, extra: string[] = []) {
  return [
    `Hello ${SITE.name},`,
    `I'd like to know your wholesale price for *${name}*.`,
    ...extra,
    '',
    `Product link: ${url}`,
  ].join('\n');
}

export const generalMessage = `Hello ${SITE.name}, I'd like to know your wholesale prices and availability.`;
