import { useState } from 'react'
import { findPartyById, type DaDataParty, type FindPartyRequest } from '../../api/dadata'
import { SearchForm } from './components/SearchForm'
import { SearchResults } from './components/SearchResults'
import { InnModal } from './components/InnModal'
import './inn.css'

export function InnSearch() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DaDataParty[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedParty, setSelectedParty] = useState<DaDataParty | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  async function onSearch(innDigits: string) {
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

  function onDetails(party: DaDataParty) {
    setSelectedParty(party)
    setModalOpen(true)
  }

  function onCloseModal() {
    setModalOpen(false)
    setSelectedParty(null)
  }

  return (
    <div className="inn-wrap">
      <h2 className="inn-title">Поиск организации по ИНН</h2>
      <SearchForm onSearch={onSearch} loading={loading} />
      <SearchResults results={results} error={error} onDetails={onDetails} />
      {modalOpen && selectedParty && <InnModal party={selectedParty} onClose={onCloseModal} />}
    </div>
  )
}



