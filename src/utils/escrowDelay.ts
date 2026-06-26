export const DELAI_AUTO_JOURS = 7;

export function joursRestantsAvantLiberationAuto(dateLivraison: string): number {
  const livraison = new Date(dateLivraison);
  const maintenant = new Date();
  const joursEcoules = Math.floor(
    (maintenant.getTime() - livraison.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, DELAI_AUTO_JOURS - joursEcoules);
}
