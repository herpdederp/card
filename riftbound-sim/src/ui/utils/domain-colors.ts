import { Domain } from "../../models/card.js";

export const domainColors: Record<Domain, string> = {
  [Domain.Fury]: "#c0392b",
  [Domain.Calm]: "#27ae60",
  [Domain.Mind]: "#8e44ad",
  [Domain.Body]: "#e67e22",
  [Domain.Chaos]: "#f39c12",
  [Domain.Order]: "#2980b9",
};

export function getDomainColor(domain: Domain): string {
  return domainColors[domain] ?? "#666";
}

export function getDomainGradient(domains: Domain[]): string {
  if (domains.length === 0) return "#444";
  if (domains.length === 1) return domainColors[domains[0]];
  return `linear-gradient(135deg, ${domains.map(d => domainColors[d]).join(", ")})`;
}
