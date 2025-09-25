import { useState } from 'react'
import { InnSearch } from './features/inn/InnSearch.tsx'

type Section = {
  id: string
  title: string
  content: React.ReactNode
}

const sections: Section[] = [
  {
    id: 'home',
    title: 'Главная',
    content: <InnSearch />,
  },
  {
    id: 'api',
    title: 'API',
    content: (
      <div className="inn-wrap">
        <h2 className="inn-title">API Документация</h2>
        <p>Здесь будет документация по API для поиска организаций по ИНН.</p>
        <p>Используйте DaData API для получения данных о компаниях.</p>
      </div>
    ),
  },
  {
    id: 'contacts',
    title: 'Контакты',
    content: (
      <div className="inn-wrap">
        <h2 className="inn-title">Контакты</h2>
        <p>Свяжитесь с нами для вопросов по сервису.</p>
        <p>Email: support@inn-search.ru</p>
        <p>Телефон: +7 (123) 456-78-90</p>
      </div>
    ),
  },
]

function App() {
  const [currentSection, setCurrentSection] = useState('home')

  const activeSection = sections.find(s => s.id === currentSection) || sections[0]

  return (
    <div className="site">
      <header className="site-header">
        <div className="site-container">
          <div className="brand">
            <span className="brand-logo">ИНН</span>
            <span className="brand-name">Поиск организаций</span>
          </div>
          <nav className="nav">
            {sections.map(section => (
              <button
                key={section.id}
                className="nav-link"
                onClick={() => setCurrentSection(section.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="site-main">
        <div className="site-container">
          {activeSection.content}
        </div>
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-left">© {new Date().getFullYear()} Поиск по ИНН</div>
          <div className="footer-right">Данные: DaData</div>
        </div>
      </footer>
    </div>
  )
}

export default App
