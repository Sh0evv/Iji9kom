import type { GalleryItem } from '../config'
import { AssetImage } from './AssetImage'

type LoadoutSectionProps = {
  items: readonly GalleryItem[]
  onSelect: (item: GalleryItem) => void
}

export function LoadoutSection({
  items,
  onSelect,
}: LoadoutSectionProps) {
  return (
    <section
      className="portfolio-section"
      aria-labelledby="loadout-heading"
    >
      <h2 id="loadout-heading">Loadout</h2>

      <div className="item-grid loadout-grid">
        {items.map((item) => (
          <button
            type="button"
            className="gallery-card loadout-card"
            key={item.name}
            onClick={() => onSelect(item)}
            aria-label={`Открыть ${item.name}`}
          >
            <div className="weapon-image">
              <AssetImage
                src={item.image}
                alt={item.name}
                mode="contain"
              />
            </div>

            <span className="weapon-name">{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}