const checkFilter = (data, appliedFilters, filters, plotID) => {
  const plot = data.plots[data.plots.map((e) => e.id).indexOf(plotID)]
  if (!appliedFilters.value) return 'not loaded'
  for (const appliedFilter in appliedFilters.value) {
    const currentFilter = appliedFilters.value[appliedFilter]
    const filterName = Object.keys(currentFilter)[0]
    const filterType = filters.find((filter) => {
      return filter.slug === filterName
    })
    switch (filterType.type.type) {
      case 'status':
      case 'checkbox':
        if (currentFilter[filterName] && currentFilter[filterName].length !== 0) {
          if (!currentFilter[filterName].includes(plot[filterName])) return false
        }
        break
      case 'range':
        if (currentFilter[filterName] && currentFilter[filterName]['min'] !== undefined && currentFilter[filterName]['max'] !== undefined) {
          if (plot[filterName] < currentFilter[filterName]['min'] || plot[filterName] > currentFilter[filterName]['max']) return false
        }
        break
      case 'radio':
        //hardcoded omdat radio kut is opgezet
        if (currentFilter[filterName] && currentFilter[filterName].length !== 0) {
          if (currentFilter[filterName] === '1 of meer' && plot[filterName] < 1) return false
          if (currentFilter[filterName] === '2 of meer' && plot[filterName] < 2) return false
        }
        break
    }
  }
  return true
}

export default checkFilter
