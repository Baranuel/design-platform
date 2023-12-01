export const calculateDividerOverlap = (divider: DOMRect, elementsToWatch:DOMRect[]) => {
    
    const elementsOverlap = elementsToWatch.some(element => {
        const overlap = element.left + 5  < divider.left + divider.width && element.left + element.width > divider.left
        return overlap
      })
      return elementsOverlap
}