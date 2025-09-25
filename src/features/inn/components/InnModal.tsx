import { type DaDataParty } from '../../../api/dadata'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'react-toastify'

interface InnModalProps {
  party: DaDataParty
  onClose: () => void
}

export function InnModal({ party, onClose }: InnModalProps) {
  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      toast.success('Скопировано!')
    } catch {
      toast.error('Не удалось скопировать')
    }
  }

  function copyAll(party: DaDataParty) {
    const data = [
      `Название: ${party.data?.name?.full_with_opf ?? party.value}`,
      `ИНН: ${party.data?.inn ?? '-'}`,
      `ОГРН: ${party.data?.ogrn ?? '-'}`,
      `КПП: ${party.data?.kpp ?? '-'}`,
      `Тип: ${party.data?.type === 'LEGAL' ? 'Юридическое лицо' : 'Индивидуальный предприниматель'}`,
      `Адрес: ${party.data?.address?.value ?? '-'}`,
    ].join('\n')
    copyToClipboard(data)
  }

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
    <div className="inn-modal-overlay" onClick={onClose}>
      <div className="inn-modal" onClick={(e) => e.stopPropagation()}>
        <button className="inn-modal-close" onClick={onClose}>×</button>
        <h3>{party.data?.name?.full_with_opf ?? party.value}</h3>
        <div className="inn-modal-content">
          <div className="inn-section">
            <div className="inn-section-title">Статус</div>
            {statusRu && <span className={`badge badge-status status-${rawStatus.toLowerCase()}`}>{statusRu}</span>}
          </div>
          <div className="inn-section">
            <div className="inn-section-title">Идентификаторы</div>
            <div className="inn-modal-grid">
              <div className="inn-field-pair">
                <div className="inn-key">ИНН</div>
                <div className="inn-val">{party.data?.inn ?? '-'}</div>
                <ContentCopyIcon onClick={() => copyToClipboard(party.data?.inn ?? '')} className="inn-copy-icon" />
              </div>
              <div className="inn-field-pair">
                <div className="inn-key">ОГРН</div>
                <div className="inn-val">{party.data?.ogrn ?? '-'}</div>
                <ContentCopyIcon onClick={() => copyToClipboard(party.data?.ogrn ?? '')} className="inn-copy-icon" />
              </div>
              {party.data?.kpp && (
                <div className="inn-field-pair">
                  <div className="inn-key">КПП</div>
                  <div className="inn-val">{party.data.kpp}</div>
                  <ContentCopyIcon onClick={() => copyToClipboard(party.data.kpp ?? '')} className="inn-copy-icon" />
                </div>
              )}
              <div className="inn-field-pair">
                <div className="inn-key">Тип</div>
                <div className="inn-val">{party.data?.type === 'LEGAL' ? 'Юридическое лицо' : 'Индивидуальный предприниматель'}</div>
                <ContentCopyIcon onClick={() => copyToClipboard(party.data?.type === 'LEGAL' ? 'Юридическое лицо' : 'Индивидуальный предприниматель')} className="inn-copy-icon" />
              </div>
            </div>
          </div>
          {party.data?.address?.value && (
            <div className="inn-section">
              <div className="inn-section-title">Адрес</div>
              <div className="inn-address-row">
                <div className="inn-address">{party.data.address.value}</div>
                <ContentCopyIcon onClick={() => copyToClipboard(party.data?.address?.value ?? '')} className="inn-copy-icon" />
              </div>
            </div>
          )}
          <div className="inn-modal-actions">
            <button onClick={() => copyAll(party)} className="inn-button inn-button-ghost">Копировать все</button>
          </div>
        </div>
      </div>
    </div>
  )
}
