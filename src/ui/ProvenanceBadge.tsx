import type { Evidence, Provenance } from '../data/display';
import { activeLanguage, loc, t } from './t';
import type { MessageKey } from './texts';
import { Icon, type IconName } from './Icon';
import { Tooltip } from './Tooltip';
import { SOURCES, sourceUrl, type SourceDef } from './catalog';

/**
 * Name, legend text, icon and whether the sources are linked, per provenance; as a Record, the compiler enforces that
 * every provenance is present. "From Classic" names the source Classic, which has no address of its own.
 */
const PROVENANCE_INFO = {
  confirmed: { label: 'provenance_confirmed', legend: 'legend_confirmed', icon: 'confirmed', linked: true },
  classic: { label: 'provenance_classic', legend: 'legend_classic', icon: 'classic', linked: false },
  community: { label: 'provenance_community', legend: 'legend_community', icon: 'community', linked: true },
  unconfirmed: { label: 'provenance_unconfirmed', legend: 'legend_unconfirmed', icon: 'unconfirmed', linked: true },
  estimate: { label: 'provenance_estimate', legend: 'legend_estimate', icon: 'estimate', linked: false },
} as const satisfies Record<Provenance, { label: MessageKey; legend: MessageKey; icon: IconName; linked: boolean }>;

/** Provenances in display order (order of the keys above), e.g. for the legend. */
export const PROVENANCES = (Object.keys(PROVENANCE_INFO) as Provenance[]).map((id) => ({ id, ...PROVENANCE_INFO[id] }));

/** Provenance icon without text; the caller sets the name (tooltip label, `aria-label` or visible text). */
export const ProvenanceIcon = ({ provenance }: { provenance: Provenance }) => (
  <Icon name={PROVENANCE_INFO[provenance].icon} size={14} stroke={2.6} />
);

/** Name of a provenance, e.g. "confirmed". */
const provenanceLabel = (provenance: Provenance) => t(PROVENANCE_INFO[provenance].label);

interface Props {
  evidence?: Evidence | undefined;
  /** The note is already visible next to it; the tooltip then only shows the name and the sources. */
  noteShown?: boolean;
}

/** Converts a timestamp such as "1:01:13" or "9:28" to seconds. */
const toSeconds = (at: string) => at.split(':').reduce((sum, part) => sum * 60 + Number(part), 0);

/** Address of the source; with a timestamp, the link jumps to that point (YouTube parameter `t`). */
function withTimestamp(url: string, at: string | undefined) {
  if (!at) return url;
  const target = new URL(url);
  target.searchParams.set('t', `${toSeconds(at)}s`);
  return target.toString();
}

/** Source definition for an ID from the data; undefined for an unknown ID. */
const sourceOf = (id: string): SourceDef | undefined => SOURCES[id as keyof typeof SOURCES] as SourceDef | undefined;

/** Only sources with an https address are linked; the addresses come exclusively from `SOURCES`. */
function sourceLinks(evidence: Evidence): { title: string; url: string }[] {
  if (!PROVENANCE_INFO[evidence.provenance].linked) return [];
  return (evidence.sources ?? []).flatMap((id) => {
    const src = sourceOf(id);
    const url = src && sourceUrl(src, activeLanguage());
    return src && url?.startsWith('https://')
      ? [{ title: loc(src.title), url: withTimestamp(url, evidence.at?.[id]) }]
      : [];
  });
}

/** Without an evidence entry, a value counts as an estimate without a note. */
const UNRATED: Evidence = { provenance: 'estimate' };

/** Title of a source for the tooltip, with the timestamp for podcasts; undefined for an unknown source. */
function sourceLabel(evidence: Evidence, id: string): string | undefined {
  const source = sourceOf(id);
  if (!source) return undefined;
  const title = loc(source.title);
  const at = evidence.at?.[id];
  return at ? t('sourceAt', { title, at }) : title;
}

/** Tooltip text after the provenance name: the note unless it is already visible, then the sources. */
function tooltipDetails(evidence: Evidence, noteShown: boolean): string {
  const sources = (evidence.sources ?? [])
    .map((id) => sourceLabel(evidence, id))
    .filter(Boolean)
    .join(', ');
  const note = evidence.note && !noteShown ? loc(evidence.note) : '';
  return [note, sources && `${t('sources')}: ${sources}`].filter(Boolean).join(' ');
}

/** Provenance badge; note and sources are in the tooltip (own element instead of `title`). */
export function ProvenanceBadge({ evidence = UNRATED, noteShown = false }: Props) {
  const label = provenanceLabel(evidence.provenance);
  const details = tooltipDetails(evidence, noteShown);
  const className = `provenance-badge provenance-badge-${evidence.provenance}`;
  // The badge only shows the icon, so the tooltip leads with the provenance name.
  const text = details ? `${label}: ${details}` : label;
  return (
    <span class="provenance-badge-with-links">
      <Tooltip class={className} label={label} text={text}>
        <ProvenanceIcon provenance={evidence.provenance} />
      </Tooltip>
      {sourceLinks(evidence).map((src) => (
        <a
          key={src.url}
          class="source-link"
          href={src.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('openSource', { title: src.title })}
        >
          <Icon name="link" size={13} stroke={2.2} />
        </a>
      ))}
    </span>
  );
}
