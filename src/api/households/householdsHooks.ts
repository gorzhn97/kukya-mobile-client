import { useQuery } from "@tanstack/react-query"
import { getHouseholds } from "./householdsApi"



export const useHouseholds = () => {
    return useQuery({ queryKey: ['households'], queryFn: getHouseholds })
} 