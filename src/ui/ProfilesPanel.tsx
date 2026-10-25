import type { SavedProfile, StoreResult } from '../persistence/storage';
import { t } from './t';
import { STORAGE_ERROR_MESSAGE } from './storageMessages';

interface Props {
  profiles: StoreResult<SavedProfile[]>;
  onLoad: (profile: SavedProfile) => void;
  onDelete: (profile: SavedProfile) => void;
  onReset: () => void;
}

const dateFormat = new Intl.DateTimeFormat(t('locale'), { dateStyle: 'medium', timeStyle: 'short' });

export function ProfilesPanel({ profiles, onLoad, onDelete, onReset }: Props) {
  return (
    <section class="panel">
      <h2>{t('profilesTitle')}</h2>
      {!profiles.ok ? (
        <div class="notice">
          <p>{t(STORAGE_ERROR_MESSAGE[profiles.error])}</p>
          {profiles.error === 'corrupt' && (
            <button
              type="button"
              class="danger"
              onClick={() => {
                if (confirm(t('resetProfilesConfirm'))) onReset();
              }}
            >
              {t('resetProfiles')}
            </button>
          )}
        </div>
      ) : profiles.value.length === 0 ? (
        <p class="help">{t('noProfiles')}</p>
      ) : (
        <ul class="profiles">
          {profiles.value.map((p) => (
            <li key={p.id}>
              <span>
                <strong>{p.name}</strong> <small>{dateFormat.format(new Date(p.savedAt))}</small>
              </span>
              <span class="row">
                {/* Every row has these buttons; the name tells a screen reader which profile they act on. */}
                <button type="button" aria-label={t('loadProfile', { name: p.name })} onClick={() => onLoad(p)}>
                  {t('load')}
                </button>
                <button
                  type="button"
                  class="danger"
                  aria-label={t('deleteProfile', { name: p.name })}
                  onClick={() => {
                    if (confirm(t('deleteConfirm', { name: p.name }))) onDelete(p);
                  }}
                >
                  {t('delete')}
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
