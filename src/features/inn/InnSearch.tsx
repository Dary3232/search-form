import { useState } from 'react'
import { findPartyById, type DaDataParty, type FindPartyRequest } from '../../api/dadata'
import './inn.css'

export function InnSearch() {
  const [inn, setInn] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DaDataParty[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  

  const innDigits = inn.replace(/\D/g, '')
  const isInnValid = innDigits.length === 10 || innDigits.length === 12

  async function onSearch(e?: React.FormEvent) {
    e?.preventDefault()
    setResults(null)
    setError(null)
    try {
      setLoading(true)
      const payload: FindPartyRequest = {
        query: innDigits,
        branch_type: 'MAIN',
      }
      const response = await findPartyById(payload)
      setResults(response.suggestions)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'
      setError(message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="inn-wrap">
      <h2 className="inn-title">Поиск организации по ИНН</h2>
      <form onSubmit={onSearch} className="inn-form">
        <input
          placeholder="Введите ИНН (10 или 12 цифр)"
          value={innDigits}
          onChange={(e) => setInn(e.target.value.replace(/\D/g, '').slice(0, 12))}
          className="inn-input"
        />
        <button type="submit" disabled={loading || !isInnValid} className="inn-button">
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </form>
      <div className="inn-hint">
        {isInnValid ? 'ИНН валиден' : 'Допустимы только цифры. Длина: 10 или 12'}
      </div>


      {error && (<div className="inn-error">Ошибка: {error}</div>)}

      {results && results.length > 0 && (
        <div className="inn-results">
          {results.map((s, idx) => (
            <div key={idx} className="inn-card">
              <div className="inn-card-title">{s.data?.name?.full_with_opf ?? s.value}</div>
              <div className="inn-meta">
                <span>ИНН: {s.data?.inn ?? '-'}</span>
                {s.data?.kpp && <span>КПП: {s.data.kpp}</span>}
                {s.data?.ogrn && <span>ОГРН: {s.data.ogrn}</span>}
                {s.data?.type && <span>Тип: {s.data.type === 'LEGAL' ? 'ЮЛ' : 'ИП'}</span>}
                {s.data?.state?.status && <span>Статус: {s.data.state.status}</span>}
              </div>
              {s.data?.address?.value && (
                <div className="inn-address">Адрес: {s.data.address.value}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <div className="inn-empty">Ничего не найдено.</div>
      )}
    </div>
  )
}


