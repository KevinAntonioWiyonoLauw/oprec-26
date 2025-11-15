import adminConfig from "../config/adminNIM.json";

export const getAdminNims = (): string[] => {
  return adminConfig.adminNims || [];
};

export const isAdminNim = (nim: string): boolean => {
  const list = getAdminNims();
  return list.includes(nim);
};