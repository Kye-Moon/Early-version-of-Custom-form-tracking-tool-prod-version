export function mapResultsToIds<T extends { id: string }>(ids: string[], results: T[]) {
    return ids.map((id) => results.find((result) => result.id === id))
}
