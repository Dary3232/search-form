import { type DaDataParty } from '../../../api/dadata'
import { InnCard } from './InnCard'

interface SearchResultsProps {
  results: DaDataParty[] | null
  error: string | null
  onDetails: (party: DaDataParty) => void
}

export function SearchResults({ results, error, onDetails }: SearchResultsProps) {
  if (error) {
    return <div className="inn-error">Ошибка: {error}</div>
  }

  if (results && results.length > 0) {
    return (
      <div className="inn-results-block">
        <div className="inn-results-header-block">
          <h3 className="inn-results-header">Результат поиска</h3>
        </div>
        <div className="inn-results">
          {results.map((s, idx) => (
            <InnCard key={idx} party={s} onDetails={onDetails} />
          ))}
        </div>
      </div>
    )
  }

  if (results && results.length === 0) {
    return <div className="inn-empty">Ничего не найдено.</div>
  }

  return null
}
