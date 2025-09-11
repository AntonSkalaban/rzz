"use client"

import { useState, useMemo, useCallback } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"
import Image from "next/image"
import { TonIcon } from "@/components/icons/ton-icon"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

// Моковые данные
const collections = [
  { name: "VOID", icon: "/placeholder.svg?height=24&width=24", floorPrice: 1.5 },
  { name: "Not Pixel", icon: "/placeholder.svg?height=24&width=24", floorPrice: 2.3 },
  { name: "Disk Trickster", icon: "/placeholder.svg?height=24&width=24", floorPrice: 0.9 },
  { name: "Lost Dogs", icon: "/placeholder.svg?height=24&width=24", floorPrice: 0.7 },
  { name: "Glance", icon: "/placeholder.svg?height=24&width=24", floorPrice: null },
  { name: "Hitoku", icon: "/placeholder.svg?height=24&width=24", floorPrice: null },
]

const types = [
  { name: "Cards", floorPrice: 0.7 },
  { name: "Skins", floorPrice: 0.5 },
  { name: "Lootbox", floorPrice: 0.6 },
  { name: "Secretbox", floorPrice: 12.1 },
]

const rarities = ["common", "uncommon", "rare", "epic", "legendary", "mythic"]

const mockItemNames = [
  "Believer",
  "Pixel Knight",
  "Void Walker",
  "Forest Spirit",
  "Common Sword",
  "Uncommon Shield",
  "Pixel Mage",
  "Ancient Relic",
  "Shadow Dagger",
  "Mystic Orb",
]

const defaultPriceRange = [0, 999];
export function FiltersContent() {
  const { t } = useLanguage() // Получаем функцию перевода

  // Состояния для каждого фильтра
  const [selectedSort, setSelectedSort] = useState<string>("price_desc")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCollections, setSelectedCollections] = useState<string[]>([])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>(defaultPriceRange)
  const [selectedTitles, setSelectedTitles] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Обработчики изменений
  const handleTypeChange = useCallback((value: string) => {
    setSelectedTypes((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]))
  }, [])

  const handleCollectionChange = useCallback((value: string) => {
    setSelectedCollections((prev) => (prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]))
  }, [])

  const handleRarityChange = useCallback((rarity: string) => {
    setSelectedRarities((prev) => (prev.includes(rarity) ? prev.filter((r) => r !== rarity) : [...prev, rarity]))
  }, [])

  const handleTitleChange = useCallback((title: string) => {
    setSelectedTitles((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }, [])

  const handleClearAll = useCallback(() => {
    setSelectedSort("price_desc")
    setSelectedTypes([])
    setSelectedCollections([])
    setSelectedRarities([])
    setPriceRange([0, 99999])
    setSelectedTitles([])
    setSearchTerm("")
  }, [])

  // Функции для получения краткого описания фильтров
  const getSortSummary = useMemo(() => {
    if (selectedSort === "price_desc") return t("filters.priceHighToLow")
    if (selectedSort === "price_asc") return t("filters.priceLowToHigh")
    return ""
  }, [selectedSort, t])

  const getTypesSummary = useMemo(() => {
    if (selectedTypes.length === 0) return ""
    return `${selectedTypes.length} selected`
  }, [selectedTypes])

  const getCollectionsSummary = useMemo(() => {
    if (selectedCollections.length === 0) return ""
    return `${selectedCollections.length} selected`
  }, [selectedCollections])

  const getRaritiesSummary = useMemo(() => {
    if (selectedRarities.length === 0) return ""
    return `${selectedRarities.length} selected`
  }, [selectedRarities])

  const getPriceSummary = useMemo(() => {
    if (priceRange[0] === 0 && priceRange[1] === 99999) return ""
    return `${priceRange[0]} - ${priceRange[1]} TON`
  }, [priceRange])

  const getTitlesSummary = useMemo(() => {
    if (selectedTitles.length === 0) return ""
    return `${selectedTitles.length} selected`
  }, [selectedTitles])

  // Вспомогательный компонент для отображения списка выбранных элементов в Popover
  const SelectedItemsList = ({ items }: { items: string[] }) => {
    if (items.length === 0) return <p className="text-[var(--text-muted)]">{t("filters.noFiltersSelected")}</p>
    return (
      <ul className="list-disc list-inside text-[var(--text-primary)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    )
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)]">
      <div className="p-4 border-b border-[var(--border-primary)]">
        <h2 className="text-xl font-bold text-[var(--accent-gold)] text-center">{t("filters.title")}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {/* Search - This search is for filters within the sidebar/sheet, not the main page search */}
        <div className="relative mb-4">
          <Input
            placeholder={t("filters.searchPlaceholder")}
            className="pr-10 placeholder:text-[var(--accent-gold)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-gold)]" />
        </div>
        <Accordion type="multiple" defaultValue={[]} className="w-full space-y-2">
          {/* Sort by */}
          <AccordionItem value="sort" className="border-none">
            <Popover>
              <PopoverTrigger asChild>
                <AccordionTrigger summary={getSortSummary}>{t("filters.sortBy")}</AccordionTrigger>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-[var(--bg-tertiary)] border-[var(--border-primary)] rounded-lg shadow-lg">
                <p className="text-[var(--text-primary)] text-sm">
                  {t("filters.selectedFilters")}: {getSortSummary}
                </p>
              </PopoverContent>
            </Popover>
            <AccordionContent className="pt-2 pb-0">
              <RadioGroup value={selectedSort} onValueChange={setSelectedSort} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price_desc" id="price_desc" />
                  <Label htmlFor="price_desc" className="text-[var(--text-primary)]">
                    {t("filters.priceHighToLow")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="price_asc" id="price_asc" />
                  <Label htmlFor="price_asc" className="text-[var(--text-primary)]">
                    {t("filters.priceLowToHigh")}
                  </Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          {/* Type */}
          <AccordionItem value="type" className="border-none">
            <Popover>
              <PopoverTrigger asChild>
                <AccordionTrigger summary={getTypesSummary}>{t("filters.type")}</AccordionTrigger>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-[var(--bg-tertiary)] border-[var(--border-primary)] rounded-lg shadow-lg">
                <SelectedItemsList items={selectedTypes} />
              </PopoverContent>
            </Popover>
            <AccordionContent className="pt-2 pb-0">
              <div className="space-y-2">
                {types.map((type) => (
                  <div key={type.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type.name.toLowerCase()}`}
                        checked={selectedTypes.includes(type.name.toLowerCase())}
                        onCheckedChange={() => handleTypeChange(type.name.toLowerCase())}
                      />
                      <Label
                        htmlFor={`type-${type.name.toLowerCase()}`}
                        className="text-[var(--text-primary)] data-[state=checked]:text-[var(--accent-gold)]"
                      >
                        {type.name}
                      </Label>
                    </div>
                    <div className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                      <TonIcon width={12} height={12} className="text-[var(--accent-gold)]" />
                      <span className="text-[var(--accent-gold)]">{type.floorPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Collection */}
          <AccordionItem value="collection" className="border-none">
            <Popover>
              <PopoverTrigger asChild>
                <AccordionTrigger summary={getCollectionsSummary}>{t("filters.collection")}</AccordionTrigger>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-[var(--bg-tertiary)] border-[var(--border-primary)] rounded-lg shadow-lg">
                <SelectedItemsList items={selectedCollections} />
              </PopoverContent>
            </Popover>
            <AccordionContent className="pt-2 pb-0">
              <div className="space-y-2">
                {collections.map((collection) => (
                  <div key={collection.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`collection-${collection.name.toLowerCase()}`}
                        checked={selectedCollections.includes(collection.name.toLowerCase())}
                        onCheckedChange={() => handleCollectionChange(collection.name.toLowerCase())}
                      />
                      <Image
                        src={collection.icon || "/placeholder.svg"}
                        alt={collection.name}
                        width={24}
                        height={24}
                        className="rounded"
                      />
                      <Label
                        htmlFor={`collection-${collection.name.toLowerCase()}`}
                        className="text-[var(--text-primary)] data-[state=checked]:text-[var(--accent-gold)]"
                      >
                        {collection.name}
                      </Label>
                    </div>
                    <div className="text-sm text-[var(--text-muted)] flex items-center gap-1">
                      <TonIcon width={12} height={12} className="text-[var(--accent-gold)]" />
                      <span className="text-[var(--accent-gold)]">{collection.floorPrice ?? "-"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Rarity */}
          <AccordionItem value="rarity" className="border-none">
            <Popover>
              <PopoverTrigger asChild>
                <AccordionTrigger summary={getRaritiesSummary}>{t("filters.rarity")}</AccordionTrigger>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-[var(--bg-tertiary)] border-[var(--border-primary)] rounded-lg shadow-lg">
                <SelectedItemsList items={selectedRarities} />
              </PopoverContent>
            </Popover>
            <AccordionContent className="pt-2 pb-0">
              <div className="grid grid-cols-2 gap-2">
                {rarities.map((rarity) => (
                  <Button
                    key={rarity}
                    variant={selectedRarities.includes(rarity) ? "gold" : "secondary"}
                    size="sm"
                    className="capitalize"
                    onClick={() => handleRarityChange(rarity)}
                  >
                    {rarity}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Price */}
          <AccordionItem value="price" className="border-none">
            <Popover>
              <PopoverTrigger asChild>
                <AccordionTrigger summary={getPriceSummary}>{t("filters.price")}</AccordionTrigger>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-[var(--bg-tertiary)] border-[var(--border-primary)] rounded-lg shadow-lg">
                <p className="text-[var(--text-primary)] text-sm">
                  {t("filters.selectedFilters")}: {priceRange[0]} - {priceRange[1]} TON
                </p>
              </PopoverContent>
            </Popover>
            <AccordionContent className="pt-2 pb-0">
              <Slider
                defaultValue={defaultPriceRange}
                max={defaultPriceRange[1]}
                step={10}
                className="my-4"
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <TonIcon
                    width={16}
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-gold)]"
                  />
                  <Input
                    type="number"
                    placeholder="0"
                    className="pl-8 text-[var(--accent-gold)]"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  />
                </div>
                <span className="text-[var(--text-primary)]">-</span>
                <div className="relative flex-1">
                  <TonIcon
                    width={16}
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--accent-gold)]"
                  />
                  <Input
                    type="number"
                    placeholder="99999"
                    className="pl-8 text-[var(--accent-gold)]"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Title - Изменено на список чекбоксов */}
          <AccordionItem value="title" className="border-none">
            <Popover>
              <PopoverTrigger asChild>
                <AccordionTrigger summary={getTitlesSummary}>{t("filters.titleFilter")}</AccordionTrigger>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2 bg-[var(--bg-tertiary)] border-[var(--border-primary)] rounded-lg shadow-lg">
                <SelectedItemsList items={selectedTitles} />
              </PopoverContent>
            </Popover>
            <AccordionContent className="pt-2 pb-0">
              <div className="grid grid-cols-1 gap-2">
                {mockItemNames.map((itemName) => (
                  <div key={itemName} className="flex items-center space-x-2">
                    <Checkbox
                      id={`item-${itemName.toLowerCase().replace(/\s/g, "-")}`}
                      checked={selectedTitles.includes(itemName)}
                      onCheckedChange={() => handleTitleChange(itemName)}
                    />
                    <Label
                      htmlFor={`item-${itemName.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-[var(--text-primary)]"
                    >
                      {itemName}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="p-4 border-t border-[var(--border-primary)] flex gap-2">
        <Button
          variant="secondary"
          className="w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--accent-gold)]"
          onClick={handleClearAll}
        >
          {t("filters.clearAll")}
        </Button>
        <Button variant="primary" className="w-full">
          {t("filters.showResults")}
        </Button>
      </div>
    </div>
  )
}
