import { useState } from 'react'

interface SearchFormProps {
  onSearch: (inn: string) => void
  loading: boolean
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [inn, setInn] = useState('')

  const innDigits = inn.replace(/\D/g, '')
  const isInnValid = innDigits.length === 10 || innDigits.length === 12

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    onSearch(innDigits)
  }

  function handleClear() {
    setInn('')
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="inn-form">
        <input
          placeholder="Введите ИНН (10 или 12 цифр)"
          value={innDigits}
          onChange={(e) => setInn(e.target.value.replace(/\D/g, '').slice(0, 12))}
          className="inn-input"
        />
        <button type="submit" disabled={loading || !isInnValid} className="inn-button">
          {loading ? 'Поиск...' : 'Найти'}
        </button>
        <button type="button" onClick={handleClear} className="inn-button inn-button-ghost" disabled={loading}>
          Очистить
        </button>
      </form>
      <div className="inn-hint">
        {isInnValid ? 'ИНН валиден' : 'Допустимы только цифры. Длина: 10 или 12'}
      </div>
    </>
  )
}
