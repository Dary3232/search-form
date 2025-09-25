import { type DaDataParty } from '../../../api/dadata'

interface InnCardProps {
  party: DaDataParty
  onDetails: (party: DaDataParty) => void
}

export function InnCard({ party, onDetails }: InnCardProps) {
  const rawStatus = (party.data?.state?.status || '').toUpperCase()
  const statusMap: Record<string, string> = {
    ACTIVE: 'Действующая',
    LIQUIDATED: 'Ликвидирована',
    LIQUIDATING: 'Ликвидируется',
    BANKRUPT: 'Банкротство',
    REORGANIZING: 'Реорганизация',
  }
  const statusRu = statusMap[rawStatus]

  return (
    <div className="inn-card">
      <div className="inn-card-header">
        <div className="inn-card-title">{party.data?.name?.full_with_opf ?? party.value}</div>
        {statusRu && <span className={`badge badge-status status-${rawStatus.toLowerCase()}`}>{statusRu}</span>}
      </div>

      <div className="inn-section">
        <div className="inn-section-title">Идентификаторы</div>
        <div className="inn-grid">
          <div className="inn-field-pair"><div className="inn-key">ИНН</div><div className="inn-val">{party.data?.inn ?? '-'}</div></div>
          <div className="inn-field-pair"><div className="inn-key">ОГРН</div><div className="inn-val">{party.data?.ogrn ?? '-'}</div></div>
          {party.data?.kpp && <div className="inn-field-pair"><div className="inn-key">КПП</div><div className="inn-val">{party.data.kpp}</div></div>}
          {party.data?.type && <div className="inn-field-pair"><div className="inn-key">Тип</div><div className="inn-val">{party.data.type === 'LEGAL' ? 'Юридическое лицо' : 'Индивидуальный предприниматель'}</div></div>}
        </div>
      </div>

      {party.data?.address?.value && (
        <div className="inn-section">
          <div className="inn-section-title">Адрес</div>
          <div className="inn-address">{party.data.address.value}</div>
        </div>
      )}

      <div className="inn-card-actions">
        <button type="button" onClick={() => onDetails(party)} className="inn-button">Подробнее</button>
      </div>
    </div>
  )
}
