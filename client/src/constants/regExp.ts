export const https = /^(https:\/\/)/;
export const subdomain = /^(https:\/\/)(?:[a-zA-Z0-9-]+\.)?/;
export const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const subdomain2 = /^(https:\/\/)(?:[a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+/;
export const domainUpLevel = /^(https:\/\/)(?:[a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-z]{2,}/;
export const link = /^(https:\/\/)(?:[a-zA-Z0-9-]+\.)?[a-zA-Z0-9-]+\.[a-z]{2,}(?:\?.*)?(?:\?.*)?/;
export const telegramLink = /^(https?:\/\/(t\.me|telegram\.me)\/[a-zA-Z0-9_]+|tg:\/\/resolve\?domain=[a-zA-Z0-9_]+)$/;
