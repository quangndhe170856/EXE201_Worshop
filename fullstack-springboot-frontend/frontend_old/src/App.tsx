import { useState, useMemo } from 'react'
import { Navigation } from './components/Navigation'
import { HeroCarousel } from './components/HeroCarousel'
import { SpecialEvents } from './components/SpecialEvents'
import { EventDetail } from './components/EventDetail'
import { CreateEvent } from './components/CreateEvent'
import { SearchAndFilters, FilterState } from './components/SearchAndFilters'
import { eventsData } from './data/events'
import { filterEvents, sortEvents } from './utils/filterEvents'

type ViewState = 'home' | 'eventDetail' | 'createEvent'

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home')
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categories: [],
    dateRange: {},
    priceRange: [0, 5000000],
    locations: [],
    sortBy: 'date'
  })

  const selectedEvent = selectedEventId ? eventsData.find(event => event.id === selectedEventId) : null

  // Filter and sort events based on current filters
  const filteredAndSortedEvents = useMemo(() => {
    const filtered = filterEvents(eventsData, filters)
    return sortEvents(filtered, filters.sortBy)
  }, [filters])

  const handleEventClick = (eventId: number) => {
    setSelectedEventId(eventId)
    setCurrentView('eventDetail')
  }

  const handleCreateEvent = () => {
    setCurrentView('createEvent')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedEventId(null)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      categories: [],
      dateRange: {},
      priceRange: [0, 5000000],
      locations: [],
      sortBy: 'date'
    })
  }

  if (currentView === 'createEvent') {
    return <CreateEvent onBack={handleBackToHome} />
  }

  if (currentView === 'eventDetail' && selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={handleBackToHome} />
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation onCreateEvent={handleCreateEvent} />
      <HeroCarousel onEventClick={handleEventClick} />
      <SearchAndFilters 
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        eventCount={filteredAndSortedEvents.length}
      />
      <SpecialEvents 
        events={filteredAndSortedEvents} 
        onEventClick={handleEventClick} 
      />
    </div>
  )
}